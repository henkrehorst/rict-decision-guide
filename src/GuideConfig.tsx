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
            helpInformation: 'Certain users may require less performance for their daily operations, while others need more powerful assets.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.PERFORMANCE,
            title: 'Functional relevance',
            question: 'How well does the device’s functionality meet current operational requirements?',
            helpInformation: 'Organizations require a certain level of functionality in their hardware. If the device has deteriorated to a degree where it is (almost) unusable, it could be replaced.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.PERFORMANCE,
            title: 'Reliability',
            question: 'How reliable has the device been over the past 90 days (e.g., minimal issues or downtime)?',
            helpInformation: 'Reliability considers aspects as issues with the device, such as downtime or unwished behaviour.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.PERFORMANCE,
            title: 'Security',
            question: 'How well is the device supported with regular and sufficient security updates?',
            helpInformation: 'Security regards the protection from external threats, such as the potential for data breaches, where company data can be acquired by people with bad intentions.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.COST,
            title: 'Depreciation position',
            question: 'How well does the current device’s depreciation position support keeping it in use rather than replacing it now?',
            helpInformation: 'Devices can be deducted to gain a financial benefit, meaning the company could pay less taxes in every year that a device can still be depreciated.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.COST,
            title: 'Warranty/maintenance',
            question: 'How well is the device covered by active warranty or maintenance with acceptable turnaround times?',
            helpInformation: 'Devices that are covered by warranty are cheap or free to repair. Acceptable turnaround times refer to the time it takes for this repair to complete, while this duration does not disrupt daily operations.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.COST,
            title: 'Bulk replacement',
            question: 'How financially beneficial would it be to replace functional devices through bulk purchasing?',
            helpInformation: 'Suppliers of hardware may offer a discount for organizations that buy a significant amount of the same hardware.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.COST,
            title: 'Psychological obsolescence',
            question: 'How well does the device meet employee expectations and preferences for modern technologies?',
            helpInformation: 'Employees may have a high desire for using the newest technology available.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.COST,
            title: 'Technical obsolescence',
            question: 'How cost-effective is it to continue using the current asset compared to acquiring a newer version?',
            helpInformation: 'The devaluation of products due to advances in technology for newer versions of the same product. As a result of these advances, it may be financially beneficial to use the new one in place of the old one, as the old one may lose its resell value.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.SUSTAINABILITY,
            title: 'Reuse potential',
            question: 'How well can the device be credibly reused internally within the organization?',
            helpInformation: 'If a device is not useful for certain employees anymore, it may still be suitable for reuse by other employees within the organization.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.SUSTAINABILITY,
            title: 'Energy efficiency delta',
            question: 'How much potential is there for lowering energy use by replacing the device?',
            helpInformation: 'Newer devices may or may not be more efficient in terms of energy use, as a result of, for example, improved technology or more power-intensive graphical cards.',
            layer: LayersEnum.LAYER2
        },
        {
            pillar: PillarEnum.SUSTAINABILITY,
            title: 'Recycling of spare parts',
            question: 'How well can functioning parts from to-be decommissioned devices be recovered for reuse or recycling?',
            helpInformation: 'Functioning parts from obsolete hardware could be extracted, and be reused internally in other devices that need a replacement of such parts.',
            layer: LayersEnum.LAYER2
        },
    ],
    decisionThresholds: {
        LOW: 1.75,
        MEDIUM: 2,
        HIGH: 2.5
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
            question: 'If we refurbish the asset, will cost meet our organization’s requirements for at least the next 12 months?',
            layer: LayersEnum.LAYER3
        },
        {
            pillar: PillarEnum.PERFORMANCE,
            title: 'Effectiveness',
            question: 'If we refurbish the asset, will performance meet our organization’s requirements for at least the next 12 months?',
            layer: LayersEnum.LAYER3
        },
        {
            pillar: PillarEnum.SUSTAINABILITY,
            title: 'Effectiveness',
            question: 'If we refurbish the asset, will sustainability meet our organization’s requirements for at least the next 12 months?',
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
    ],
    nonNegotiableTradeOffQuestion: [
        {
            title: 'Depreciation',
            question: 'Has the depreciation period of the asset expired yet?',
            layer: LayersEnum.LAYER1,
            factor: 'Depreciation',
            replaceHardwareWhenAnswerIs: true
        },
        {
            title: 'Warranty',
            question: 'Is the asset still under (supplier) warranty coverage?',
            layer: LayersEnum.LAYER1,
            factor: 'Warranty',
            replaceHardwareWhenAnswerIs: false
        },
        {
            title: 'Security',
            question: 'Is the hardware still compliant with required security updates?',
            layer: LayersEnum.LAYER1,
            factor: 'Security',
            replaceHardwareWhenAnswerIs: false
        },
        {
            title: 'Functionality',
            question: 'Is the asset’s main function still performing as intended?',
            layer: LayersEnum.LAYER1,
            factor: 'Functional obsolescence',
            replaceHardwareWhenAnswerIs: false
        },
    ]
}