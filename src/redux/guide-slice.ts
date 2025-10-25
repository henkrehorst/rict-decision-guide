import {ScreenEnum} from "../types/enums/screen-enum.ts";
import {createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store.ts";

interface GuideState {
    screen: ScreenEnum
}

const initialState: GuideState = {
    screen: ScreenEnum.START
}

export const guideSlice = createSlice({
    name: 'guide',
    initialState,
    reducers: {
        setScreen: (state, action: PayloadAction<{screen: ScreenEnum}>) => {
            state.screen = action.payload.screen;
        }
    }
});

export const selectGuideSliceState = (state: RootState) => state.guide;

export const selectCurrentScreen = createSelector(
    selectGuideSliceState,
    (state) => (state.screen)
)

export const {
    setScreen,
} = guideSlice.actions;

export const guideReducer = guideSlice.reducer;