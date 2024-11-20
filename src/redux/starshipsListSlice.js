import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SWAPI_1 = import.meta.env.VITE_SWAPI_1;
const SWAPI_2 = import.meta.env.VITE_SWAPI_2;

// Async thunk to fetch starships list (pagination supported)
export const fetchStarships = createAsyncThunk(
  "starshipsList/fetchStarships",
  async (next, { rejectWithValue }) => {
    try {
      const response = next
        ? await axios.get(next)
        : await axios.get(`${SWAPI_1}?page=1`);
      return response.data;
    } catch (error) {
      console.error("API 1 failed:", error);
      try {
        const response = next
          ? await axios.get(next)
          : await axios.get(`${SWAPI_2}?page=1`);
        return response.data;
      } catch (error) {
        console.error("API 2 failed:", error);
        return rejectWithValue("Failed to fetch starships from both APIs.");
      }
    }
  }
);

// Slice for starships list state
const starshipsListSlice = createSlice({
  name: "starshipsList",
  initialState: {
    list: [],
    loading: false,
    error: null,
    next: null,
    loadedUrls: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarships.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.loading = false;
        const newStarships = action.payload.results;
        // Avoiding duplicate starships
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
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default starshipsListSlice.reducer;
