import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface InfoPage { 
  count: number;
  pages: number;
  prev: string;
  next: string;
}

interface ApiResponse {
  results: Episode[];
  info: InfoPage;
}

export interface EpisodeState {
  listOfEpisodes: Episode[];
  infoPage: InfoPage | null; 
  isLoading: boolean;
  error: string | null;
}

export const fetchEpisodes = createAsyncThunk(
  "episodes/fetchEpisodes",
  async (page: number) => {
    try {
      const response: AxiosResponse = await axios.get(
        `https://rickandmortyapi.com/api/episode?page=${page}`
      );
      return response.data;
    } 
    catch (error) {
      // throw new Error(error.message);
    }
  }
);


const episodesSlice = createSlice({
  name: "episodes",

  initialState: {
    listOfEpisodes: [],
    infoPage: null,
    isLoading: false,
    error: null,
  } as EpisodeState, 

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.isLoading = false;
        state.listOfEpisodes = action.payload.results;
        state.infoPage = action.payload.info;
      })
      .addCase(fetchEpisodes.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default episodesSlice.reducer;