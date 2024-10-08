"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createUser } from "../app/store/userSlice";
import { AppDispatch } from "../app/store/store";

interface FormData {
  username: string;
  phone: string;
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

const schema = yup.object().shape({
  username: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  gender: yup.string().required(),
  address: yup.string().required(),
  pincode: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
});

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Apply form types to useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Correctly type the onSubmit handler
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(
      createUser({
        username: data.username,
        phone: data.phone,
        profile: {
          email: data.email,
          gender: data.gender,
          address: data.address,
          pincode: data.pincode,
          city: data.city,
          state: data.state,
          country: data.country,
        },
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Username</label>
        <input {...register("username")} className="w-full border p-2" />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label>Phone</label>
        <input {...register("phone")} className="w-full border p-2" />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register("email")} className="w-full border p-2" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Gender</label>
        <input {...register("gender")} className="w-full border p-2" />
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div>
        <label>Address</label>
        <input {...register("address")} className="w-full border p-2" />
        {errors.address && <p>{errors.address.message}</p>}
      </div>
      <div>
        <label>Pincode</label>
        <input {...register("pincode")} className="w-full border p-2" />
        {errors.pincode && <p>{errors.pincode.message}</p>}
      </div>
      <div>
        <label>City</label>
        <input {...register("city")} className="w-full border p-2" />
        {errors.city && <p>{errors.city.message}</p>}
      </div>
      <div>
        <label>State</label>
        <input {...register("state")} className="w-full border p-2" />
        {errors.state && <p>{errors.state.message}</p>}
      </div>
      <div>
        <label>Country</label>
        <input {...register("country")} className="w-full border p-2" />
        {errors.country && <p>{errors.country.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;
