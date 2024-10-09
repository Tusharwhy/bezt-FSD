"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/store";
import { fetchUsersAsync, updateUserAsync } from "@/store/userSlice";
import { UserForm } from "@/components/UserForm";
import { Button } from "@/components/Button";

export default function EditUserPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { users, status, error } = useSelector(
    (state: RootState) => state.user
  );
  const user = users.find((u) => u.id === Number(id));

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsersAsync());
    }
  }, [status, dispatch]);

  const handleSubmit = async (data: any) => {
    await dispatch(updateUserAsync({ id: Number(id), userData: data }));
    router.push("/users");
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User: {user.username}</h1>
      <UserForm onSubmit={handleSubmit} initialData={user} />
      <div className="mt-4">
        <Button href="/users" className="bg-gray-500">
          Back to Users
        </Button>
      </div>
    </div>
  );
}
