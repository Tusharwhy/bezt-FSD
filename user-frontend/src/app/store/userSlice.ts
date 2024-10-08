import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for User and State
interface User {
  id?: string;
  username: string;
  phone: string;
  profile: {
    email: string;
    gender: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  };
}

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the initial state using the UserState interface
const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

const API_URL = "http://localhost:3001/api"; // Update with your backend URL

// Fetch users async action
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data as User[];
});

// Create user async action
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData: User) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data as User;
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      });
  },
});

export default userSlice.reducer;
