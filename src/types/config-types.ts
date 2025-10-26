import type {ReactNode} from "react";

export interface Question {
    layer: LayersEnum;
    title: string;
    question: string;
}

export enum LayersEnum {
    START = 'START',
    LAYER0 = 'LAYER0',
    LAYER1 = 'LAYER1',
    LAYER2 = 'LAYER2',
    LAYER3 = 'LAYER3',
    NON_NEGOTIABLE_EXISTS = 'NON_NEGOTIABLE_EXISTS',
    END = 'END',
}

export enum PillarEnum {
    COST = 'COST',
    PERFORMANCE = 'PERFORMANCE',
    SUSTAINABILITY = 'SUSTAINABILITY',
}

export enum PriorityEnum {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export interface PriorityRange {
    min: number;
    max: number;
}

export interface NoNNegotiableQuestion extends Question {
    tip: string;
    tipIcon: ReactNode;
    factors: Array<string>;
}


export interface ValueProfileQuestion extends Question {
    values: {
        [PillarEnum.COST]: {name: string};
        [PillarEnum.PERFORMANCE]: {name: string};
        [PillarEnum.SUSTAINABILITY]: {name: string};
    }
}

export interface NegotiableTradeOffQuestion extends Question {
    pillar: PillarEnum;
}

export interface RefurbishmentQuestion extends Question{
    pillar?: PillarEnum;
}

export interface DecisionThresholds {
    [PriorityEnum.LOW]: number;
    [PriorityEnum.MEDIUM]: number;
    [PriorityEnum.HIGH]: number;
}

export interface IGuideConfig {
    nonNegotiableQuestion: NoNNegotiableQuestion;
    valueProfileQuestion: ValueProfileQuestion;
    negotiableTradeOffQuestions: Array<NegotiableTradeOffQuestion>;
    refurbishmentQuestions: Array<RefurbishmentQuestion>;
    decisionThresholds: DecisionThresholds;
    priorityRange: {
        [PriorityEnum.LOW]: PriorityRange;
        [PriorityEnum.HIGH]: PriorityRange;
        [PriorityEnum.MEDIUM]: PriorityRange;
    }
}

