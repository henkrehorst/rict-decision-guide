import {createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store.ts";
import {GuideConfig} from "../GuideConfig.tsx";
import {LayersEnum, PillarEnum} from "../types/config-types.ts";

interface GuideState {
    screen: LayersEnum
    nonNegotiableFactors: Array<{ factor: string, value: "false" | "true" | null }>
    valueProfile: {
        [PillarEnum.SUSTAINABILITY]: number,
        [PillarEnum.PERFORMANCE]: number,
        [PillarEnum.COST]: number,
    }
    progress: number,
    tradeoffQuestionIndex: number,
    tradeoffQuestionResults: Array<{ pillar: PillarEnum, value: number }>
}

const initialState: GuideState = {
    screen: LayersEnum.START,
    nonNegotiableFactors: GuideConfig.nonNegotiableQuestion.factors.map((factor) => ({
        factor: factor,
        value: null
    })),
    valueProfile: {
        SUSTAINABILITY: 0,
        PERFORMANCE: 0,
        COST: 0,
    },
    progress: 0,
    tradeoffQuestionIndex: 0,
    tradeoffQuestionResults: GuideConfig.negotiableTradeOffQuestions.map(item => ({
        pillar: item.pillar,
        value: -1
    }))
}

export const guideSlice = createSlice({
    name: 'guide',
    initialState,
    reducers: {
        resetState: () => initialState,
        setTradeOffQuestionValue: (state, action: PayloadAction<{ index: number, value: number }>) => {
            state.tradeoffQuestionResults[action.payload.index].value = action.payload.value;
        },
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
                case LayersEnum.LAYER1:
                    state.screen = LayersEnum.LAYER2;
                    state.tradeoffQuestionIndex = 0;
                    state.progress = 50 + Math.min(Math.max(((state.tradeoffQuestionIndex+1) / state.tradeoffQuestionResults.length) * 40, 0), 40);
                    break;
                case LayersEnum.LAYER2:
                    if (state.tradeoffQuestionIndex + 1 < state.tradeoffQuestionResults.length) {
                        state.screen = LayersEnum.LAYER2;
                        state.tradeoffQuestionIndex = state.tradeoffQuestionIndex + 1;
                        state.progress = 50 + Math.min(Math.max(((state.tradeoffQuestionIndex+1) / state.tradeoffQuestionResults.length) * 40, 0), 40);
                    }else{
                        state.screen = LayersEnum.LAYER3;
                    }
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
                case LayersEnum.LAYER2:
                    if (state.tradeoffQuestionIndex - 1 < 0) {
                        state.screen = LayersEnum.LAYER1;
                    }else{
                        state.tradeoffQuestionIndex = state.tradeoffQuestionIndex - 1;
                        state.progress = 50 + Math.min(Math.max(((state.tradeoffQuestionIndex+1) / state.tradeoffQuestionResults.length) * 40, 0), 40);
                    }
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
        setNonNegotiableFactorValue: (state, action: PayloadAction<{ index: number, value: "true" | "false" | null }>) => {
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

export const selectTradeoffQuestionIndex = createSelector(
    selectGuideSliceState,
    (state) => (state.tradeoffQuestionIndex)
)

export const selectCurrentTradeOffQuestionValue = createSelector(
    selectGuideSliceState,
    (state) => (state.tradeoffQuestionResults[state.tradeoffQuestionIndex].value)
)

export const selectIsNonNegotiableFactorsSelectionComplete = createSelector(
    selectGuideSliceState,
    (state) => state.nonNegotiableFactors.every((factor) => factor.value !== null)
)

export const selectIsNextStepPossible = createSelector(
    selectGuideSliceState,
    (state) => {
        switch (state.screen) {
            case LayersEnum.START:
                return true;
            case LayersEnum.LAYER0:
                return state.nonNegotiableFactors.every((factor) => factor.value !== null);
            case LayersEnum.LAYER1:
                return Object.values(state.valueProfile).reduce((total, num) => total + num, 0) >= 99;
            case LayersEnum.LAYER2:
                return state.tradeoffQuestionResults[state.tradeoffQuestionIndex].value !== -1;
        }

        return false;
    }
)

export const {
    goToNextStep,
    goToPreviousStep,
    setNonNegotiableFactorValue,
    resetState,
    setValueProfile,
    setTradeOffQuestionValue
} = guideSlice.actions;

export const guideReducer = guideSlice.reducer;