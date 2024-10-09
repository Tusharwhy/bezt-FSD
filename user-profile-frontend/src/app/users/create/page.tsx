"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store";
import { createUserAsync } from "@/store/userSlice";
import { UserForm } from "@/components/UserForm";
import { Button } from "@/components/Button";

export default function CreateUserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await dispatch(createUserAsync(data));
    router.push("/users");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>
      <UserForm onSubmit={handleSubmit} />
      <div className="mt-4">
        <Button href="/users" className="bg-gray-500">
          Back to Users
        </Button>
      </div>
    </div>
  );
}
