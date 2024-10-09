import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@/types";

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  profile: z.object({
    email: z.string().email("Invalid email address"),
    gender: z.enum(["male", "female", "other"]),
    address: z.string().min(5, "Address must be at least 5 characters"),
    pincode: z.string().regex(/^\d{5,6}$/, "Pincode must be 5 or 6 digits"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
  }),
});

type UserFormData = z.infer<typeof userSchema>;

const mapUserToFormData = (user: User): Partial<UserFormData> => ({
  username: user.username,
  phone: user.phone,
  profile: {
    ...user.profile,
    gender: (user.profile.gender as "male" | "female" | "other") || "other",
  },
});

interface UserFormProps {
  onSubmit: SubmitHandler<UserFormData>;
  initialData?: User;
}

export const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData ? mapUserToFormData(initialData) : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block mb-1">
          Username
        </label>
        <input
          id="username"
          {...register("username")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="block mb-1">
          Phone
        </label>
        <input
          id="phone"
          {...register("phone")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          id="email"
          {...register("profile.email")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.profile?.email && (
          <span className="text-red-500">{errors.profile.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="gender" className="block mb-1">
          Gender
        </label>
        <select
          id="gender"
          {...register("profile.gender")}
          className="w-full border rounded px-2 py-1"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.profile?.gender && (
          <span className="text-red-500">{errors.profile.gender.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="address" className="block mb-1">
          Address
        </label>
        <input
          id="address"
          {...register("profile.address")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.profile?.address && (
          <span className="text-red-500">{errors.profile.address.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="pincode" className="block mb-1">
          Pincode
        </label>
        <input
          id="pincode"
          {...register("profile.pincode")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.profile?.pincode && (
          <span className="text-red-500">{errors.profile.pincode.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="city" className="block mb-1">
          City
        </label>
        <input
          id="city"
          {...register("profile.city")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.profile?.city && (
          <span className="text-red-500">{errors.profile.city.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="state" className="block mb-1">
          State
        </label>
        <input
          id="state"
          {...register("profile.state")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.profile?.state && (
          <span className="text-red-500">{errors.profile.state.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="country" className="block mb-1">
          Country
        </label>
        <input
          id="country"
          {...register("profile.country")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.profile?.country && (
          <span className="text-red-500">{errors.profile.country.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};
