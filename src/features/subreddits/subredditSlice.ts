import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubreddits, fetchSubredditDetails } from "../../api/redditApi";

interface SubredditState {
  subreddits: any[];
  filteredSubreddits: any[];
  selectedSubredditDetails: any | null;  // Estado para los detalles del subreddit seleccionado
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchTerm: string;
}

const initialState: SubredditState = {
  subreddits: [],
  filteredSubreddits: [],
  selectedSubredditDetails: null,
  status: 'idle',
  error: null,
  searchTerm: '',
}

export const getSubreddits = createAsyncThunk('subreddits/fetchSubreddits', async () => {
  const response = await fetchSubreddits();
  return response.data.children;
});

export const getSubredditDetails = createAsyncThunk('subreddits/fetchSubredditDetails', async (subredditName: string) => {
  const response = await fetchSubredditDetails(subredditName);
  return response.data;
});

const subredditSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      if (state.searchTerm === '') {
        state.filteredSubreddits = state.subreddits;
      } else {
        state.filteredSubreddits = state.subreddits.filter(subreddit =>
          subreddit.data.display_name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
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
        state.filteredSubreddits = action.payload;
      })
      .addCase(getSubreddits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching subreddits';
      })
      .addCase(getSubredditDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSubredditDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedSubredditDetails = action.payload;
      })
      .addCase(getSubredditDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching subreddit details';
      });
  },
})

export const { setSearchTerm } = subredditSlice.actions;
export default subredditSlice.reducer;
