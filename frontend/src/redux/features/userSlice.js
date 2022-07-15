import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const register = createAsyncThunk(
  "user/register",
  async ({ userData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.register(userData);
      toast.success("Successfully registered");
      navigate("/");
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ userData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.login(userData);
      toast.success("Successfully logged in");
      navigate("/");
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuth: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    setLogout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.isAuth = false;
    },
  },

  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isAuth = true;
      localStorage.setItem("token", JSON.stringify({ ...payload }));
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isAuth = true;
      localStorage.setItem("token", JSON.stringify({ ...payload }));
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, setLogout } = userSlice.actions;

export default userSlice.reducer;
