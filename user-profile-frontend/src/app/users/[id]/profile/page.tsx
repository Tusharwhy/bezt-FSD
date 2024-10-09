"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchUsersAsync } from "@/store/userSlice";
import { Button } from "@/components/Button";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector(
    (state: RootState) => state.user
  );
  const user = users.find((u) => u.id === Number(id));

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsersAsync());
    }
  }, [status, dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile: {user.username}</h1>
      <div className="mb-4 space-x-2">
        <Button href={`/users/${id}/edit`}>Edit User</Button>
        <Button href="/users" className="bg-gray-500">
          Back to Users
        </Button>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </strong>
          <span>{user.username}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">
            Phone:
          </strong>
          <span>{user.phone}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </strong>
          <span>{user.profile.email}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">
            Gender:
          </strong>
          <span>{user.profile.gender}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">
            Address:
          </strong>
          <span>{user.profile.address}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">
            City:
          </strong>
          <span>{user.profile.city}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">
            State:
          </strong>
          <span>{user.profile.state}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">
            Country:
          </strong>
          <span>{user.profile.country}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">
            Pincode:
          </strong>
          <span>{user.profile.pincode}</span>
        </div>
      </div>
    </div>
  );
}
