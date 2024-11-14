import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SWAPI_1 = import.meta.env.VITE_SWAPI_1;
const SWAPI_2 = import.meta.env.VITE_SWAPI_2;

// Async thunk to fetch starships list (pagination supported)
export const fetchStarships = createAsyncThunk(
  "starships/fetchStarships",
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

// Async thunk to fetch starship details
export const fetchStarshipDetails = createAsyncThunk(
  "starships/fetchStarshipDetails",
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

// Slice for starship state
const starshipSlice = createSlice({
  name: "starships",
  initialState: {
    list: [],
    selectedStarship: null,
    listStatus: "idle",
    detailsStatus: "idle",
    error: null,
    next: null,
    loadedUrls: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For list fetching
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
      })

      // For fetching starship details
      .addCase(fetchStarshipDetails.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(fetchStarshipDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.selectedStarship = action.payload;
      })
      .addCase(fetchStarshipDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default starshipSlice.reducer;
