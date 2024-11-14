import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_1 = import.meta.env.VITE_API_URL_1;
const API_URL_2 = import.meta.env.VITE_API_URL_2;

// Async thunk to fetch starships
export const fetchStarships = createAsyncThunk(
  "starships/fetchStarships",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL_1}?page=1`);
      return response.data;
    } catch (error) {
      console.error("API 1 failed:", error);
      try {
        const response = await axios.get(`${API_URL_2}?page=1`);
        return response.data;
      } catch (error) {
        console.error("API 2 also failed:", error);
        return rejectWithValue("Failed to fetch starships from both APIs.");
      }
    }
  }
);

// Slice for starship state
const starshipSlice = createSlice({
  name: "starships",
  initialState: {
    list: [],
    listStatus: "idle",
    error: null,
    next: null,
    loadedUrls: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarships.pending, (state) => {
        state.listStatus = "loading";
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        const newStarships = action.payload.results;

        if (newStarships.length === 0) {
          state.next = null;
        } else {
          const uniqueStarships = newStarships.filter(
            (starship) => !state.loadedUrls.includes(starship.url)
          );
          state.list.push(...uniqueStarships);
          state.loadedUrls.push(...uniqueStarships.map((s) => s.url));
          state.next = action.payload.next;
        }
      })
      .addCase(fetchStarships.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default starshipSlice.reducer;