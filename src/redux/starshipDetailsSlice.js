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
      const starship = response.data;

      // Fetch pilot details
      const pilotDetails = await Promise.all(
        starship.pilots.map(async (pilotUrl) => {
          const pilotResponse = await axios.get(pilotUrl);
          const pilot = pilotResponse.data;

          // Get the pilot ID from the URL
          const pilotId = pilotUrl.match(/\/people\/(\d+)\//)?.[1];
          return { ...pilot, id: pilotId };
        })
      );

      // Fetch film details
      const filmDetails = await Promise.all(
        starship.films.map(async (filmUrl) => {
          const filmResponse = await axios.get(filmUrl);
          const film = filmResponse.data;

          // Get the film ID from the URL
          const filmId = filmUrl.match(/\/films\/(\d+)\//)?.[1];
          return { ...film, id: filmId };
        })
      );

      return { starship, pilots: pilotDetails, films: filmDetails };
    } catch (error) {
      console.error("API 1 failed:", error);
      try {
        const response = await axios.get(`${SWAPI_2}/${starshipId}/`);
        const starship = response.data;

        const pilotDetails = await Promise.all(
          starship.pilots.map(async (pilotUrl) => {
            const pilotResponse = await axios.get(pilotUrl);
            const pilot = pilotResponse.data;

            const pilotId = pilotUrl.match(/\/people\/(\d+)\//)?.[1];
            return { ...pilot, id: pilotId };
          })
        );

        const filmDetails = await Promise.all(
          starship.films.map(async (filmUrl) => {
            const filmResponse = await axios.get(filmUrl);
            const film = filmResponse.data;

            const filmId = filmUrl.match(/\/films\/(\d+)\//)?.[1];
            return { ...film, id: filmId };
          })
        );

        return { starship, pilots: pilotDetails, films: filmDetails };
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
    pilots: [],
    films: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarshipDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.pilots = []; // Clear pilots when loading new details
        state.films = []; // Clear films when loading new details
      })
      .addCase(fetchStarshipDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStarship = action.payload.starship;
        state.pilots = action.payload.pilots;
        state.films = action.payload.films;
      })
      .addCase(fetchStarshipDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default starshipDetailsSlice.reducer;
