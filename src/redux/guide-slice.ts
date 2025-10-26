import {createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store.ts";
import {GuideConfig} from "../GuideConfig.tsx";
import {LayersEnum, PillarEnum} from "../types/config-types.ts";

interface GuideState {
    screen: LayersEnum
    nonNegotiableFactors: Array<{ factor: string, value: "false" | "true" | undefined }>
    valueProfile: {
        [PillarEnum.SUSTAINABILITY]: number,
        [PillarEnum.PERFORMANCE]: number,
        [PillarEnum.COST]: number,
    }
    progress: number
}

const initialState: GuideState = {
    screen: LayersEnum.START,
    nonNegotiableFactors: GuideConfig.nonNegotiableQuestion.factors.map((factor) => ({
        factor: factor,
        value: undefined
    })),
    valueProfile: {
        SUSTAINABILITY: 0,
        PERFORMANCE: 0,
        COST: 0,
    },
    progress: 0,
}

export const guideSlice = createSlice({
    name: 'guide',
    initialState,
    reducers: {
        resetState: () => initialState,
        goToNextStep: (state) => {
            switch (state.screen) {
                case LayersEnum.START:
                    state.screen = LayersEnum.LAYER0;
                    state.progress = 15;
                    break;
                case LayersEnum.LAYER0:
                    state.screen = LayersEnum.LAYER1;
                    state.progress = 40;
                    break;
            }
        },
        goToPreviousStep: (state) => {
            switch (state.screen) {
                case LayersEnum.LAYER0:
                    state.screen = LayersEnum.START;
                    state.progress = 40;
                    break;
                case LayersEnum.LAYER1:
                    state.screen = LayersEnum.LAYER0;
                    state.progress = 15;
                    break;
            }
        },
        setValueProfile: (state, action: PayloadAction<{
            [PillarEnum.SUSTAINABILITY]: number,
            [PillarEnum.PERFORMANCE]: number,
            [PillarEnum.COST]: number
        }>) => {
            state.valueProfile = action.payload;
        },
        setNonNegotiableFactorValue: (state, action: PayloadAction<{ index: number, value: "true" | "false" }>) => {
            state.nonNegotiableFactors[action.payload.index].value = action.payload.value;
        }
    }
});

export const selectGuideSliceState = (state: RootState) => state.guide;

export const selectCurrentLayer = createSelector(
    selectGuideSliceState,
    (state) => (state.screen)
)

export const selectNonNegotiableFactors = createSelector(
    selectGuideSliceState,
    (state) => (state.nonNegotiableFactors)
)

export const selectProgress = createSelector(
    selectGuideSliceState,
    (state) => (state.progress)
)

export const selectValueProfile = createSelector(
    selectGuideSliceState,
    (state) => (state.valueProfile)
)

export const selectIsNonNegotiableFactorsSelectionComplete = createSelector(
    selectGuideSliceState,
    (state) => state.nonNegotiableFactors.every((factor) => factor.value !== undefined)
)

export const {
    goToNextStep,
    goToPreviousStep,
    setNonNegotiableFactorValue,
    resetState,
    setValueProfile
} = guideSlice.actions;

export const guideReducer = guideSlice.reducer;