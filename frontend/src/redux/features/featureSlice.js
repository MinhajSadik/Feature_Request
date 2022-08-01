import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const addNewFeature = createAsyncThunk(
  "feature/addNewFeature",
  async ({ newFeatureData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addNewFeature(newFeatureData);
      navigate("/");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(`${error.message}`);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllFeatures = createAsyncThunk(
  "feature/getAllFeatures",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllFeatures();
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchByFeatureName = createAsyncThunk(
  "feature/searchByFeatureName",
  async (searchName, { rejectWithValue }) => {
    try {
      const response = await api.searchByFeatureName(searchName);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentOnFeature = createAsyncThunk(
  "feature/commentOnFeature",
  async ({ featureId, commentData, toast }, { rejectWithValue }) => {
    try {
      const response = await api.commentOnFeature(featureId, commentData);
      toast.success("Comment added successfully");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(`${error.message}`);
      return rejectWithValue(error.response.data);
    }
  }
);

export const voteOnFeature = createAsyncThunk(
  "feature/voteOnFeature",
  async ({ featureId, userId, toast }, { rejectWithValue }) => {
    try {
      const response = await api.voteOnFeature(featureId, userId);
      toast.success("Successfully voted");
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
    error: null,
    feature: {},
    features: [],
    loading: false,
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
    [addNewFeature.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.feature = payload;
    },
    [addNewFeature.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getAllFeatures.pending]: (state) => {
      state.loading = true;
    },
    [getAllFeatures.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.features = payload;
    },
    [getAllFeatures.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [searchByFeatureName.pending]: (state) => {
      state.loading = true;
    },
    [searchByFeatureName.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.features = payload;
    },
    [searchByFeatureName.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [commentOnFeature.pending]: (state) => {
      state.loading = true;
    },
    [commentOnFeature.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.feature = payload;
    },
    [commentOnFeature.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [voteOnFeature.pending]: (state) => {
      state.loading = true;
    },
    [voteOnFeature.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.feature = payload;
    },
    [voteOnFeature.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setFeatures } = featureSlice.actions;
export default featureSlice.reducer;
