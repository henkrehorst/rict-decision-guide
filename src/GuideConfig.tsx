import {type IGuideConfig, LayersEnum, PillarEnum} from "./types/config-types.ts";
import {Sustainability} from "@carbon/icons-react";

export const GuideConfig: IGuideConfig = {
    nonNegotiableQuestion: {
        title: 'Non-negotiable',
        question: 'Specify here which factors you consider non-negotiable in your organization',
        layer: LayersEnum.LAYER0,
        tip: 'Remember: less non-negotiable factors will result in more sustainable choices',
        tipIcon: <Sustainability size={28} className={'fill-lightgreen'}/>,
        factors: [
            'Depreciation',
            'Warranty',
            'Functional obsolescence',
            'Security'
        ]
    },
    valueProfileQuestion: {
        title: 'Value Profile',
        question: 'Specify here which value dimensions you consider, and assign a total of 99 points across all dimensions.',
        layer: LayersEnum.LAYER1,
        values: {
            COST: {name: "Costs"},
            PERFORMANCE: {name: "Performance"},
            SUSTAINABILITY: {name: 'Sustainability'}
        }
    },
    negotiableTradeOffQuestions: [
        {
            pillar: PillarEnum.PERFORMANCE,
            title: 'Fit-for-purpose',
            question: 'How well does the device meet current task needs without noticeable slowdowns?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.PERFORMANCE,
            title: 'Functional relevance',
            question: 'How well does the device’s functionality meet current operational requirements?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.PERFORMANCE,
            title: 'Reliability',
            question: 'How reliable has the device been over the past 90 days (e.g., minimal issues or downtime)?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.PERFORMANCE,
            title: 'Security',
            question: 'How well is the device supported with regular and sufficient security updates?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.COST,
            title: 'Depreciation position',
            question: 'How well does the current device’s depreciation position support keeping it in use rather than replacing it now?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.COST,
            title: 'Warranty/maintenance',
            question: 'How well is the device covered by active warranty or maintenance with acceptable turnaround times?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.COST,
            title: 'Bulk replacement',
            question: 'How financially beneficial would it be to replace functional devices through bulk purchasing?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.COST,
            title: 'Psychological obsolescence',
            question: 'How well does the device meet employee expectations and preferences for modern technologies?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.COST,
            title: 'Technical obsolescence',
            question: 'How cost-effective is it to continue using the current asset compared to acquiring a newer version?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.SUSTAINABILITY,
            title: 'Reuse potential',
            question: 'How well can the device be credibly reused internally within the organization?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.SUSTAINABILITY,
            title: 'Energy efficiency delta',
            question: 'How much potential is there for lowering energy use by replacing the device?',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.SUSTAINABILITY,
            title: 'Recycling of spare parts',
            question: 'How well can functioning parts from to-be decommissioned devices be recovered for reuse or recycling?',
            layer: LayersEnum.LAYER2
        },
    ],
    decisionThresholds: {
        LOW: 1.6,
        MEDIUM: 2,
        HIGH: 2.6
    },
    priorityRange: {
        LOW: {max: 25, min: 0},
        MEDIUM: {max: 50, min: 26},
        HIGH: {max: 99, min: 51},
    },
    refurbishmentQuestions: [
        {
            pillar: PillarEnum.COST,
            title: 'Effectiveness',
            question: 'If we do the proposed refurb, will cost meet our organization’s requirements for at least the next 12 months?',
            layer: LayersEnum.LAYER3
        },
        {
            pillar: PillarEnum.PERFORMANCE,
            title: 'Effectiveness',
            question: 'If we do the proposed refurb, will performance meet our organization’s requirements for at least the next 12 months?',
            layer: LayersEnum.LAYER3
        },
        {
            pillar: PillarEnum.SUSTAINABILITY,
            title: 'Effectiveness',
            question: 'If we do the proposed refurb, will sustainability meet our organization’s requirements for at least the next 12 months?',
            layer: LayersEnum.LAYER3
        },
        {
            title: 'Logistics',
            question: 'Are parts/service and change windows available within policy lead times, with acceptable downtime and operational risk?',
            layer: LayersEnum.LAYER3
        },
        {
            title: 'Cost',
            question: 'Is the refurb effort reasonably small and cheap relative to replacement?',
            layer: LayersEnum.LAYER3
        },
    ]
}