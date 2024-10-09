import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";
import { fetchUsers, createUser, updateUser, deleteUser } from "../lib/api";

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetchUsers();
    return response;
  }
);

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (userData: Omit<User, "id">) => {
    const response = await createUser(userData);
    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }: { id: number; userData: Partial<User> }) => {
    const response = await updateUser(id, userData);
    return response;
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
    await deleteUser(id);
    return id;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsersAsync.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = "succeeded";
          state.users = action.payload;
        }
      )
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        createUserAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.users.push(action.payload);
        }
      )
      .addCase(
        updateUserAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          const index = state.users.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteUserAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.users = state.users.filter(
            (user) => user.id !== action.payload
          );
        }
      );
  },
});

export default userSlice.reducer;
