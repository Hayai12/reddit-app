import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubreddits } from "../../api/redditApi";

interface SubredditState {
    subreddits: any[];
    filteredSubreddits: any[]; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    searchTerm: string
}

const initialState: SubredditState = {
    subreddits:[],
    filteredSubreddits: [],
    status: 'idle',
    error: null,
    searchTerm: '',
}

export const getSubreddits = createAsyncThunk('subreddits/fetchSubreddits', async () => {
    const response = await fetchSubreddits();
    return response.data.children;
  });

const subredditSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
            // Filtra los subreddits en función del término de búsqueda
            state.filteredSubreddits = state.subreddits.filter(subreddit =>
              subreddit.data.display_name.toLowerCase().includes(state.searchTerm.toLowerCase())
            );
          },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getSubreddits.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getSubreddits.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.subreddits = action.payload;
            // Inicializa los subreddits filtrados al recibir los datos
            state.filteredSubreddits = action.payload;
          })
          .addCase(getSubreddits.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Error fetching subreddits';
          });
      },
})

export const { setSearchTerm } = subredditSlice.actions;
export default subredditSlice.reducer