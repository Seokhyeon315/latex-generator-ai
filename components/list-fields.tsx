'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */


import { useActions, useUIState } from 'ai/rsc'
import React from 'react'


interface ListFeildsProps {

}
const mathFields = [
    {
        id: 1,
        fieldName: 'Linear Algebra',
        description: 'Linear Algebra studies vectors, vector spaces, and linear transformations. It involves solving systems of linear equations, understanding matrix operations, and exploring eigenvalues and eigenvectors.',
        useCases: [
            'Computer graphics and image processing',
            'Machine learning algorithms',
            'Cryptography and data encryption',
            'Robotics and control systems',
            'Quantum mechanics and quantum computing'
        ]
    },
    {
        id: 2,
        fieldName: 'Calculus',
        description: 'Calculus is a branch of mathematics that deals with the study of change. It encompasses differential calculus, which focuses on derivatives and rates of change, and integral calculus, which deals with integrals and areas under curves.',
        useCases: [
            'Modeling motion and change in physics',
            'Calculating areas and volumes in engineering',
            'Optimizing business processes and economics',
            'Analyzing dynamic systems in biology',
            'Solving differential equations in chemical reactions'
        ]
    },
    {
        id: 3,
        fieldName: 'Statistics',
        description: 'Statistics is the science of collecting, analyzing, and interpreting data. It involves methods for data analysis, probability theory, hypothesis testing, and statistical modeling to make informed decisions based on data.',
        useCases: [
            'Market research and consumer behavior analysis',
            'Risk assessment in finance and insurance',
            'Quality control in manufacturing',
            'Clinical trials and medical research',
            'Sports analytics and performance analysis'
        ]
    },
    {
        id: 4,
        fieldName: 'Trigonometry',
        description: 'Trigonometry studies the relationships between the angles and sides of triangles. It involves trigonometric functions such as sine, cosine, and tangent, and their applications in solving geometric problems.',
        useCases: [
            'Navigation and GPS technology',
            'Sound and light wave analysis',
            'Architecture and construction design',
            'Astronomy and celestial measurements',
            'Signal processing in telecommunications'
        ]
    },
    {
        id: 5,
        fieldName: 'Differential Equations',
        description: 'Differential Equations involve equations that relate a function to its derivatives. They are used to model real-world phenomena where change is continuous, such as population dynamics, heat conduction, and fluid flow.',
        useCases: [
            'Modeling population growth in ecology',
            'Predicting weather patterns in meteorology',
            'Analyzing electrical circuits and signals',
            'Simulating fluid dynamics in engineering',
            'Modeling chemical reactions and kinetics'
        ]
    },
    {
        id: 6,
        fieldName: 'Complex Analysis',
        description: 'Complex Analysis studies functions of complex numbers. It involves analytic functions, contour integration, and the study of singularities, offering insights into various fields such as fluid dynamics and electromagnetic theory.',
        useCases: [
            'Electrical engineering and signal processing',
            'Aerodynamics and fluid mechanics',
            'Quantum mechanics and wave functions',
            'Conformal mapping in computer graphics',
            'Solving boundary value problems in physics'
        ]
    },
    {
        id: 7,
        fieldName: 'Vector Calculus',
        description: 'Vector Calculus is the branch of mathematics that deals with vector fields and operations on vectors. It includes the study of gradient, divergence, and curl, and is used in physics and engineering to analyze physical quantities that have both magnitude and direction.',
        useCases: [
            'Electromagnetic field analysis in physics',
            'Fluid flow analysis in engineering',
            'Calculating gravitational fields in astronomy',
            'Modeling aerodynamic forces on aircraft',
            'Analyzing stress and strain in materials'
        ]
    },
    {
        id: 8,
        fieldName: 'Game Theory',
        description: 'Game Theory is the study of mathematical models of strategic interactions among rational decision-makers. It analyzes competitive situations where the outcome depends on the actions of all participants, and is applied in economics, political science, and evolutionary biology.',
        useCases: [
            'Economic market analysis and competition',
            'Political strategy and decision-making',
            'Negotiation and conflict resolution',
            'Modeling evolutionary strategies in biology',
            'Designing algorithms for online auctions'
        ]
    },
];


const scienceFields = [
    {
        id: 1,
        fieldName: 'Physics',
        description: 'Physics is the study of matter, energy, and the fundamental forces of nature. It explores concepts like motion, heat, light, electricity, and the structure of atoms, aiming to understand the laws governing the universe.',
        useCases: [
            'Electronics and telecommunications technology',
            'Medical imaging devices like MRI and CT scanners',
            'Space exploration and astrophysics',
        ]
    },
    {
        id: 2,
        fieldName: 'Chemistry',
        description: 'Chemistry is the science of substances, their properties, interactions, and changes. It plays a crucial role in developing materials, understanding biological processes, and producing pharmaceuticals.',
        useCases: [
            'Pharmaceutical development',
            'Material synthesis and polymers',
            'Environmental pollution analysis',
        ]
    },
    {
        id: 3,
        fieldName: 'Biology',
        description: 'Biology studies living organisms, their structure, function, growth, and evolution. It encompasses molecular biology, genetics, ecology, and more to understand the complexity of life.',
        useCases: [
            'Medical research and treatment development',
            'Biotechnology and genetic engineering',
            'Ecosystem management and conservation',
        ]
    },
    {
        id: 4,
        fieldName: 'Astronomy',
        description: 'Astronomy is the study of celestial objects, space, and the universe. It seeks to understand the origins and evolution of the universe and the laws governing celestial bodies.',
        useCases: [
            'Studying stars and galaxies',
            'Exoplanet detection and analysis',
            'Space observation and exploration',
        ]
    },
    {
        id: 5,
        fieldName: 'Earth Science',
        description: 'Earth Science studies the Earth, including its structure, composition, and processes. It encompasses geology, meteorology, oceanography, and more to understand the planet’s physical characteristics.',
        useCases: [
            'Natural disaster prediction and mitigation',
            'Climate change analysis',
            'Resource exploration and management',
        ]
    },
    {
        id: 6,
        fieldName: 'Environmental Science',
        description: 'Environmental Science studies the interactions between humans and the environment, focusing on solving issues like pollution and resource depletion using biology, chemistry, and earth science.',
        useCases: [
            'Sustainable waste management',
            'Pollution reduction strategies',
            'Ecosystem restoration',
        ]
    },
    {
        id: 7,
        fieldName: 'Material Science',
        description: 'Material Science studies the properties and applications of materials, understanding their structure at the atomic level and how it affects macroscopic properties, crucial for innovation in various industries.',
        useCases: [
            'Developing advanced materials for aerospace',
            'Creating electronic components',
            'Designing biocompatible medical implants',
        ]
    },
];


const engineeringFields = [
    {
        id: 1,
        fieldName: 'Mechanical Engineering',
        description: 'Mechanical Engineering involves the design, analysis, and manufacturing of mechanical systems. It covers concepts like mechanics, thermodynamics, and materials science to create machinery and tools.',
        useCases: [
            'Designing automotive engines and vehicles',
            'Developing HVAC systems',
            'Manufacturing industrial machinery',
        ]
    },
    {
        id: 2,
        fieldName: 'Aerospace Engineering',
        description: 'Aerospace Engineering focuses on the design, development, and testing of aircraft and spacecraft. It combines principles of fluid dynamics, materials science, and propulsion to innovate in aviation and space exploration.',
        useCases: [
            'Designing commercial and military aircraft',
            'Developing spacecraft and satellites',
            'Improving aerodynamics for efficiency',
        ]
    },
    {
        id: 3,
        fieldName: 'Electrical Engineering',
        description: 'Electrical Engineering involves the study and application of electricity, electronics, and electromagnetism. It encompasses power generation, communication systems, and electronic devices.',
        useCases: [
            'Developing electrical power grids',
            'Designing communication networks',
            'Creating consumer electronics',
        ]
    },
    {
        id: 4,
        fieldName: 'Computer Science',
        description: 'Computer Science studies algorithms, data structures, and software design. It focuses on computational systems, programming, and the development of applications for various domains.',
        useCases: [
            'Developing software and applications',
            'Building and managing databases',
            'Enhancing cybersecurity systems',
        ]
    },
    {
        id: 5,
        fieldName: 'Civil Engineering',
        description: 'Civil Engineering involves designing, constructing, and maintaining infrastructure such as roads, bridges, and buildings. It applies principles of physics and materials science to ensure structural integrity and functionality.',
        useCases: [
            'Designing and constructing buildings',
            'Developing transportation infrastructure',
            'Managing water resources and treatment facilities',
        ]
    },
    {
        id: 6,
        fieldName: 'Chemical Engineering',
        description: 'Chemical Engineering focuses on the design and operation of chemical processes to produce useful materials and products. It involves chemistry, physics, and biology to innovate in industries like pharmaceuticals and energy.',
        useCases: [
            'Developing pharmaceutical manufacturing processes',
            'Creating sustainable energy solutions',
            'Optimizing food production technologies',
        ]
    },
    {
        id: 7,
        fieldName: 'Biomedical Engineering',
        description: 'Biomedical Engineering combines principles of engineering and biology to develop technologies for healthcare. It focuses on medical devices, imaging, and biotechnology to improve patient care.',
        useCases: [
            'Designing medical imaging devices',
            'Developing prosthetics and implants',
            'Creating diagnostic equipment',
        ]
    },
    {
        id: 8,
        fieldName: 'Industrial Engineering',
        description: 'Industrial Engineering optimizes complex processes, systems, and organizations. It focuses on improving efficiency, productivity, and quality in manufacturing and service industries.',
        useCases: [
            'Streamlining manufacturing processes',
            'Enhancing supply chain management',
            'Improving quality control systems',
        ]
    },
    {
        id: 9,
        fieldName: 'Nuclear Engineering',
        description: 'Nuclear Engineering involves the study and application of nuclear processes and radiation. It focuses on the design and operation of nuclear reactors and the safe handling of nuclear materials.',
        useCases: [
            'Developing nuclear power plants',
            'Designing radiation therapy for cancer treatment',
            'Managing nuclear waste disposal',
        ]
    },
    {
        id: 10,
        fieldName: 'Computer Engineering',
        description: 'Computer Engineering integrates electrical engineering and computer science to develop hardware and software systems. It focuses on computer architecture, embedded systems, and digital circuits.',
        useCases: [
            'Designing microprocessors and computer hardware',
            'Developing embedded systems for IoT devices',
            'Creating hardware-software integration solutions',
        ]
    }
];


// When user needs to narrow down 
export const ListFields = () => {
    const [_, setMessages] = useUIState()
    const { multiStepSearchAction } = useActions()


    return (
        <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-2 sm:p-4">

        </div>
    )

}