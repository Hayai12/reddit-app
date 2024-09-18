import {configureStore} from '@reduxjs/toolkit'
import subredditReducer from '../features/subreddits/subredditSlice'

export const store = configureStore({
    reducer:{
        subreddits: subredditReducer,
    },
   devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch