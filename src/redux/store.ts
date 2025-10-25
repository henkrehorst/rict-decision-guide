import {configureStore} from '@reduxjs/toolkit'
import {guideReducer} from "./guide-slice.ts";

export const store = configureStore({
    reducer: {
        guide: guideReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type Selector<T> = (state: RootState) => T;