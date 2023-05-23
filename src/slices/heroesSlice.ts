import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

interface InfoPage {
  count: number;
  pages: number;
  prev: string;
  next: string;
}

interface ApiResponse {
  results: Character[];
  info: InfoPage;
}

export interface HeroesState {
  listOfСharacter: Character[];
  infoPage: InfoPage | null;
  hero: Character | null ;
  isLoading: boolean;
  error: string | null;
}

export const fetchHeroes = createAsyncThunk(
  "heroes/fetchHeroes",
  async (page: number) => {
    try {
      const response: AxiosResponse = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      await new Promise((r) => setTimeout(r, 1500));
      return response.data;
    } catch (error) {

    }
  }
);

export const heroesSlice = createSlice({
  name: "heroes",
  
  initialState: {
    listOfСharacter: [],
    infoPage: null,
    hero: null,
    isLoading: false,
    error: null,
  } as HeroesState, 
  
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchHeroes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHeroes.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
      state.isLoading = false;
      state.listOfСharacter = action.payload.results;
      state.infoPage = action.payload.info;
    });
    builder.addCase(fetchHeroes.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: heroesActions, reducer: heroesReducer } = heroesSlice;
export default heroesSlice.reducer;