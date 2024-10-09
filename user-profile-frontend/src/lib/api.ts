import axios from "axios";
import { User } from "@/types";

const API_URL = "http://localhost:3001/api/users";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<User> => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
