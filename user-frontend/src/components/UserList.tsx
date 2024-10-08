"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../app/store/userSlice";
import { AppDispatch, RootState } from "../app/store/store";
import Link from "next/link";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users Directory</h1>
      <Link
        href="/users/create"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create User
      </Link>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>
                <Link href={`http://localhost:3001/api/users/${user.id}`}>
                  View Profile
                </Link>
                <Link href={`http://localhost:3001/api/users/${user.id}/edit`}>
                  Edit Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
