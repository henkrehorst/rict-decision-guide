import {createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store.ts";
import {GuideConfig} from "../GuideConfig.tsx";
import {LayersEnum, PillarEnum, PriorityEnum, type RefurbishmentQuestion} from "../types/config-types.ts";
import {ResultEnum} from "../types/enums/result-enum.ts";

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
    tradeoffQuestionResults: Array<{ pillar: PillarEnum, index: number, value: number }>
    refurbishmentQuestionsIndex: number,
    refurbishmentQuestions: Array<RefurbishmentQuestion>
    refurbishmentQuestionResults: Array<{ index: number, value: -1 | boolean }>
    nonNegotiableTradeQuestionResults: Array<{ index: number, value: -1 | boolean, factor: string }>
    nonNegotiableTradeQuestionsIndex: number,
    refurbishmentResult: boolean
    nonNegotiableTradeResult: boolean
    layerBeforeEndScreen: LayersEnum
    advice: ResultEnum
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
    tradeoffQuestionResults: GuideConfig.negotiableTradeOffQuestions.map((item, index) => ({
        index: index,
        pillar: item.pillar,
        value: -1
    })),
    refurbishmentQuestionsIndex: 0,
    refurbishmentQuestions: [],
    refurbishmentQuestionResults: [],
    nonNegotiableTradeQuestionsIndex: 0,
    nonNegotiableTradeQuestionResults: GuideConfig.nonNegotiableTradeOffQuestion.map((item, index) => ({
        index: index,
        value: -1,
        factor: item.factor
    })),
    refurbishmentResult: false,
    layerBeforeEndScreen: LayersEnum.LAYER0,
    advice: ResultEnum.REPLACE,
    nonNegotiableTradeResult: false
}

export const guideSlice = createSlice({
    name: 'guide',
    initialState,
    reducers: {
        resetState: () => initialState,
        setTradeOffQuestionValue: (state, action: PayloadAction<{ index: number, value: number }>) => {
            state.tradeoffQuestionResults[action.payload.index].value = action.payload.value;
        },
        setRefurbishmentQuestionValue: (state, action: PayloadAction<{ index: number, value: -1 | boolean }>) => {
            if (typeof action.payload.value === "boolean") {
                state.refurbishmentResult = action.payload.value;
            }
            state.refurbishmentQuestionResults[action.payload.index].value = action.payload.value;
        },
        setNonNegotiableTradeQuestionValue: (state, action: PayloadAction<{
            index: number,
            value: -1 | boolean,
            factor: string
        }>) => {
            if (typeof action.payload.value === "boolean") {
                const factorInformation = state.nonNegotiableFactors.filter(x => x.factor === action.payload.factor)[0];
                state.nonNegotiableTradeResult = factorInformation.value === "true" && action.payload.value;
            }
            state.nonNegotiableTradeQuestionResults[action.payload.index].value = action.payload.value;
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
                    state.screen = LayersEnum.LAYER15;
                    state.nonNegotiableTradeQuestionsIndex = 0;
                    state.progress = 40 + Math.min(Math.max(((state.nonNegotiableTradeQuestionsIndex + 1) / state.nonNegotiableTradeQuestionResults.length) * 10, 0), 10);
                    break;
                case LayersEnum.LAYER15:
                    state.screen = LayersEnum.LAYER15;
                    if (!state.nonNegotiableTradeResult && state.nonNegotiableTradeQuestionsIndex + 1 < state.nonNegotiableTradeQuestionResults.length) {
                        state.nonNegotiableTradeQuestionsIndex = state.nonNegotiableTradeQuestionsIndex + 1
                        state.progress = 40 + Math.min(Math.max(((state.nonNegotiableTradeQuestionsIndex + 1) / state.nonNegotiableTradeQuestionResults.length) * 10, 0), 10);
                    } else if (state.nonNegotiableTradeResult) {
                        state.screen = LayersEnum.END;
                        state.layerBeforeEndScreen = LayersEnum.LAYER15;
                        state.advice = ResultEnum.REPLACE;
                        state.progress = 100;
                    } else {
                        state.screen = LayersEnum.LAYER2;
                        state.tradeoffQuestionIndex = 0;
                        state.progress = 50 + Math.min(Math.max(((state.tradeoffQuestionIndex + 1) / state.tradeoffQuestionResults.length) * 30, 0), 30);
                    }
                    break;
                case LayersEnum.LAYER2:
                    if (state.tradeoffQuestionIndex + 1 < state.tradeoffQuestionResults.length) {
                        state.screen = LayersEnum.LAYER2;
                        state.tradeoffQuestionIndex = state.tradeoffQuestionIndex + 1;
                        state.progress = 50 + Math.min(Math.max(((state.tradeoffQuestionIndex + 1) / state.tradeoffQuestionResults.length) * 30, 0), 30);
                    } else {
                        const score = scoreCalculator(state);
                        if (score.every(item => item.keep)) {
                            state.advice = ResultEnum.KEEP;
                            state.screen = LayersEnum.END;
                            state.progress = 100;
                            state.layerBeforeEndScreen = LayersEnum.LAYER2;
                        } else {
                            state.refurbishmentQuestions = getOnlyNeededRefurbishmentQuestions(score.filter(item => !item.keep).map(item => item.pillar))
                            state.refurbishmentQuestionResults = state.refurbishmentQuestions.map((_, index) => ({
                                index: index,
                                value: -1
                            }))
                            state.refurbishmentResult = false;
                            state.progress = 80 + Math.min(Math.max(((state.refurbishmentQuestionsIndex + 1) / state.refurbishmentQuestions.length) * 20, 0), 20);
                            state.screen = LayersEnum.LAYER3;
                        }
                    }
                    break;
                case LayersEnum.LAYER3:
                    if (state.refurbishmentResult && state.refurbishmentQuestionsIndex + 1 < state.refurbishmentQuestionResults.length) {
                        state.progress = 80 + Math.min(Math.max(((state.refurbishmentQuestionsIndex + 1) / state.refurbishmentQuestions.length) * 20, 0), 20);
                        state.refurbishmentQuestionsIndex = state.refurbishmentQuestionsIndex + 1;
                        state.screen = LayersEnum.LAYER3;
                    } else {
                        state.screen = LayersEnum.END;
                        state.layerBeforeEndScreen = LayersEnum.LAYER3;
                        if (state.refurbishmentResult) {
                            state.advice = ResultEnum.REFURBISHMENT;
                        } else {
                            state.advice = ResultEnum.REPLACE;
                        }
                        state.progress = 100;
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
                case LayersEnum.NON_NEGOTIABLE_EXISTS:
                    state.screen = LayersEnum.LAYER0;
                    state.progress = 15;
                    break;
                case LayersEnum.LAYER15:
                    if (state.nonNegotiableTradeQuestionsIndex - 1 < 0) {
                        state.screen = LayersEnum.LAYER1;
                        state.progress = 40;
                    } else {
                        state.nonNegotiableTradeQuestionsIndex = state.nonNegotiableTradeQuestionsIndex - 1;
                        state.progress = 40 + Math.min(Math.max(((state.nonNegotiableTradeQuestionsIndex + 1) / state.nonNegotiableTradeQuestionResults.length) * 10, 0), 10);
                    }
                    break;
                case LayersEnum.LAYER2:
                    if (state.tradeoffQuestionIndex - 1 < 0) {
                        state.screen = LayersEnum.LAYER15;
                    } else {
                        state.tradeoffQuestionIndex = state.tradeoffQuestionIndex - 1;
                        state.progress = 50 + Math.min(Math.max(((state.tradeoffQuestionIndex + 1) / state.tradeoffQuestionResults.length) * 40, 0), 40);
                    }
                    break;
                case LayersEnum.LAYER3:
                    if (state.refurbishmentQuestionsIndex - 1 < 0) {
                        state.screen = LayersEnum.LAYER2;
                    } else {
                        state.refurbishmentQuestionsIndex = state.refurbishmentQuestionsIndex - 1;
                        state.progress = 80 + Math.min(Math.max(((state.refurbishmentQuestionsIndex + 1) / state.refurbishmentQuestions.length) * 20, 0), 20);
                    }
                    break;
                case LayersEnum.END:
                    state.screen = state.layerBeforeEndScreen;
                    if (state.screen === LayersEnum.LAYER15) {
                        state.progress = 40 + Math.min(Math.max(((state.nonNegotiableTradeQuestionsIndex + 1) / state.nonNegotiableTradeQuestionResults.length) * 10, 0), 10);
                    } else if (state.screen === LayersEnum.LAYER2) {
                        state.progress = 50 + Math.min(Math.max(((state.tradeoffQuestionIndex + 1) / state.tradeoffQuestionResults.length) * 40, 0), 40);
                    } else if (state.screen === LayersEnum.LAYER3) {
                        state.progress = 80 + Math.min(Math.max(((state.refurbishmentQuestionsIndex + 1) / state.refurbishmentQuestions.length) * 20, 0), 20);
                    }
            }
        },
        setValueProfile: (state, action: PayloadAction<{
            [PillarEnum.SUSTAINABILITY]: number,
            [PillarEnum.PERFORMANCE]: number,
            [PillarEnum.COST]: number
        }>) => {
            state.valueProfile = action.payload;
        },
        setNonNegotiableFactorValue: (state, action: PayloadAction<{
            index: number,
            value: "true" | "false" | null
        }>) => {
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

export const selectNonNegotiableTradeResult = createSelector(
    selectGuideSliceState,
    (state) => state.nonNegotiableTradeResult
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

export const selectCurrentRefurbishmentQuestions = createSelector(
    selectGuideSliceState,
    (state) => ({
        question: state.refurbishmentQuestions[state.refurbishmentQuestionsIndex],
        index: state.refurbishmentQuestionsIndex
    })
)

export const selectCurrentRefurbishmentQuestionsIndex = createSelector(
    selectGuideSliceState,
    (state) => (state.refurbishmentQuestionsIndex)
)

export const selectRefurbishmentQuestionsAndResults = createSelector(
    selectGuideSliceState,
    (state) => {
        return {
            keep: state.refurbishmentQuestionResults.every(item => item.value === true),
            questions: state.refurbishmentQuestionResults.filter(item => item.value !== -1).map(question => ({
                question: state.refurbishmentQuestions[question.index],
                value: question.value as boolean
            })),
        }
    }
)

export const selectCurrentRefurbishmentQuestionValue = createSelector(
    selectGuideSliceState,
    (state) => (state.refurbishmentQuestionResults[state.refurbishmentQuestionsIndex].value)
)


export const selectIsNonNegotiableFactorsSelectionComplete = createSelector(
    selectGuideSliceState,
    (state) => state.nonNegotiableFactors.every((factor) => factor.value !== null)
)

export const selectAdvice = createSelector(
    selectGuideSliceState,
    (state) => state.advice
)

export const selectLayerBeforeEndScreen = createSelector(
    selectGuideSliceState,
    (state) => state.layerBeforeEndScreen
)

export const selectTradeOffQuestionResults = createSelector(
    selectGuideSliceState,
    (state) => state.tradeoffQuestionResults
)

export const selectPillarScoring = createSelector(
    selectGuideSliceState,
    (state) => scoreCalculator(state)
)

export const selectCurrentNonNegotiableTradeQuestionIndex = createSelector(
    selectGuideSliceState,
    (state) => state.nonNegotiableTradeQuestionsIndex
)

export const selectCurrentNonNegotiableTradeQuestionAnswer = createSelector(
    selectGuideSliceState,
    (state) => state.nonNegotiableTradeQuestionResults[state.nonNegotiableTradeQuestionsIndex]
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
            case LayersEnum.LAYER3:
                return state.refurbishmentQuestionResults[state.refurbishmentQuestionsIndex].value !== -1;
            case LayersEnum.LAYER15:
                return state.nonNegotiableTradeQuestionResults[state.nonNegotiableTradeQuestionsIndex].value !== -1;
        }

        return false;
    }
)

const scoreCalculator = (state: GuideState) => {
    const avgCalculatorMethod = (items: Array<{ pillar: PillarEnum, value: number }>, pillar: PillarEnum) => {
        return items.filter((factor) => factor.pillar === pillar && factor.value > 0)
            .reduce((avg, factor, _, {length}) => avg + factor.value / length, 0);
    }

    return Object.keys(state.valueProfile).map((pillar) => {
        let priority = PriorityEnum.LOW;

        if (GuideConfig.priorityRange[PriorityEnum.LOW].min <= state.valueProfile[pillar as PillarEnum] &&
            GuideConfig.priorityRange[PriorityEnum.LOW].max >= state.valueProfile[pillar as PillarEnum]) {
            priority = PriorityEnum.LOW;
        } else if (GuideConfig.priorityRange[PriorityEnum.MEDIUM].min <= state.valueProfile[pillar as PillarEnum] &&
            GuideConfig.priorityRange[PriorityEnum.MEDIUM].max >= state.valueProfile[pillar as PillarEnum]) {
            priority = PriorityEnum.MEDIUM;
        } else if (GuideConfig.priorityRange[PriorityEnum.HIGH].min <= state.valueProfile[pillar as PillarEnum] &&
            GuideConfig.priorityRange[PriorityEnum.HIGH].max >= state.valueProfile[pillar as PillarEnum]) {
            priority = PriorityEnum.HIGH
        }

        const score = avgCalculatorMethod(state.tradeoffQuestionResults, pillar as PillarEnum);
        const keep = score >= GuideConfig.decisionThresholds[priority];

        return {
            pillar: pillar as PillarEnum,
            priority: priority,
            score: score,
            keep: keep,
        }
    })
}

export const selectNonNegotiableTradeoffQuestionResults = createSelector(
    selectGuideSliceState,
    (state) => {
        return state.nonNegotiableTradeQuestionResults.filter((item) => item.value !== -1)
            .map(item => ({
                ...GuideConfig.nonNegotiableTradeOffQuestion[item.index],
                result: item.value
            }))
    }
)

const getOnlyNeededRefurbishmentQuestions = (pillars: PillarEnum[]) => {
    return GuideConfig.refurbishmentQuestions.filter(item => item.pillar === undefined || pillars.includes(item.pillar));
}

export const {
    setRefurbishmentQuestionValue,
    goToNextStep,
    goToPreviousStep,
    setNonNegotiableFactorValue,
    resetState,
    setValueProfile,
    setTradeOffQuestionValue,
    setNonNegotiableTradeQuestionValue
} = guideSlice.actions;

export const guideReducer = guideSlice.reducer;