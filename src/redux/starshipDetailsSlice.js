import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SWAPI_1 = import.meta.env.VITE_SWAPI_1;
const SWAPI_2 = import.meta.env.VITE_SWAPI_2;

// Async thunk to fetch starship details
export const fetchStarshipDetails = createAsyncThunk(
  "starshipDetails/fetchStarshipDetails",
  async (starshipId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SWAPI_1}/${starshipId}/`);
      return response.data;
    } catch (error) {
      console.error("API 1 failed:", error);
      try {
        const response = await axios.get(`${SWAPI_2}/${starshipId}/`);
        return response.data;
      } catch (error) {
        console.error("API 2 also failed:", error);
        return rejectWithValue("Failed to fetch starship details.");
      }
    }
  }
);

// Slice for starship details state
const starshipDetailsSlice = createSlice({
  name: "starshipDetails",
  initialState: {
    selectedStarship: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarshipDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStarshipDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStarship = action.payload;
      })
      .addCase(fetchStarshipDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default starshipDetailsSlice.reducer;
