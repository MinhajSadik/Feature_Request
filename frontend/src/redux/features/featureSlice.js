import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const addNewFeature = createAsyncThunk(
  "feature/addNewFeature",
  async ({ newFeatureData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addNewFeature(newFeatureData);
      toast.success(`feature ${response.data.name} added`);
      navigate("/");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(`${error.message}`);
      return rejectWithValue(error.response.data);
    }
  }
);

const featureSlice = createSlice({
  name: "feature",
  initialState: {
    features: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFeatures: (state, action) => {
      state.features = action.payload;
    },
  },

  extraReducers: {
    [addNewFeature.pending]: (state) => {
      state.loading = true;
    },
    [addNewFeature.fulfilled]: (state, action) => {
      state.loading = false;
      state.features = [...state.features, action.payload];
      localStorage.setItem("features", JSON.stringify({ ...action.payload }));
    },
    [addNewFeature.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setFeatures } = featureSlice.actions;
export default featureSlice.reducer;
