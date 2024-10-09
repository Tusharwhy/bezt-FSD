"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchUsersAsync, deleteUserAsync } from "@/store/userSlice";
import { Button } from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import Link from "next/link";

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector(
    (state: RootState) => state.user
  );
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  console.log("USERS PAGE");

  useEffect(() => {
    if (status === "idle") {
      console.log("Fetching users");
      dispatch(fetchUsersAsync());
      console.log(dispatch(fetchUsersAsync()));
      console.log("Users fetched");
    }
  }, [status, dispatch]);

  const handleDelete = (id: number) => {
    setDeleteUserId(id);
  };

  const confirmDelete = async () => {
    if (deleteUserId) {
      await dispatch(deleteUserAsync(deleteUserId));
      setDeleteUserId(null);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button href="/users/create">Create User</Button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Username</th>
            <th className="text-left">Phone</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2">{user.username}</td>
              <td className="py-2">{user.phone}</td>
              <td className="py-2 space-x-2">
                <Button
                  href={`/users/${user.id}/edit`}
                  className="bg-yellow-500"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500"
                >
                  Delete
                </Button>
                <Button href={`/users/${user.id}/profile`}>View Profile</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        isOpen={deleteUserId !== null}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteUserId(null)}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
}
