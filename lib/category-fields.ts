import { STEMDomain } from './types';

// Enhanced STEM domain structure for focused Math, Physics, Aerospace, and Mechanical Engineering

export const stemDomains: STEMDomain[] = [
    {
        id: 'math',
        name: 'Mathematics',
        description: 'Pure and applied mathematical concepts essential for STEM fields',
        icon: '∑',
        color: '#3B82F6',
        categories: [
            {
                id: 'calculus',
                name: 'Calculus',
                description: 'Study of continuous change, derivatives, and integrals',
                domain: 'math',
                useCases: [
                    'Rate of change analysis',
                    'Optimization problems',
                    'Area and volume calculations',
                    'Physics modeling',
                    'Engineering design'
                ],
                fields: [
                    {
                        id: 'derivatives',
                        name: 'Derivatives',
                        description: 'Rules and applications of differentiation',
                        topics: ['Power Rule', 'Product Rule', 'Chain Rule', 'Implicit Differentiation'],
                        difficulty: 'beginner'
                    },
                    {
                        id: 'integration',
                        name: 'Integration',
                        description: 'Techniques and applications of integration',
                        topics: ['Fundamental Theorem', 'Integration by Parts', 'Substitution', 'Applications'],
                        difficulty: 'intermediate',
                        prerequisites: ['derivatives']
                    },
                    {
                        id: 'multivariable',
                        name: 'Multivariable Calculus',
                        description: 'Calculus of functions with multiple variables',
                        topics: ['Partial Derivatives', 'Multiple Integrals', 'Vector Fields', 'Line Integrals'],
                        difficulty: 'advanced',
                        prerequisites: ['derivatives', 'integration']
                    }
                ]
            },
            {
                id: 'linear-algebra',
                name: 'Linear Algebra',
                description: 'Study of vectors, matrices, and linear transformations',
                domain: 'math',
                useCases: [
                    'System of equations solving',
                    'Computer graphics and 3D modeling',
                    'Data analysis and machine learning',
                    'Quantum mechanics',
                    'Control systems engineering'
                ],
                fields: [
                    {
                        id: 'vectors-matrices',
                        name: 'Vectors and Matrices',
                        description: 'Basic operations with vectors and matrices',
                        topics: ['Vector Operations', 'Matrix Multiplication', 'Determinants', 'Matrix Inverse'],
                        difficulty: 'beginner'
                    },
                    {
                        id: 'linear-systems',
                        name: 'Linear Systems',
                        description: 'Solving systems of linear equations',
                        topics: ['Gaussian Elimination', 'Matrix Methods', 'Rank and Nullity'],
                        difficulty: 'intermediate'
                    },
                    {
                        id: 'eigenvalues',
                        name: 'Eigenvalues and Eigenvectors',
                        description: 'Characteristic values and vectors of linear transformations',
                        topics: ['Characteristic Polynomial', 'Diagonalization', 'Applications'],
                        difficulty: 'advanced',
                        prerequisites: ['vectors-matrices', 'linear-systems']
                    }
                ]
            },
            {
                id: 'statistics',
                name: 'Statistics and Probability',
                description: 'Mathematical analysis of data and uncertainty',
                domain: 'math',
                useCases: [
                    'Data analysis and interpretation',
                    'Quality control in manufacturing',
                    'Risk assessment',
                    'Research and hypothesis testing',
                    'Machine learning algorithms'
                ],
                fields: [
                    {
                        id: 'probability',
                        name: 'Probability Theory',
                        description: 'Mathematical foundations of uncertainty and chance',
                        topics: ['Basic Probability', 'Conditional Probability', 'Distributions', 'Expected Value'],
                        difficulty: 'beginner'
                    },
                    {
                        id: 'descriptive-stats',
                        name: 'Descriptive Statistics',
                        description: 'Methods for summarizing and describing data',
                        topics: ['Central Tendency', 'Variability', 'Correlation', 'Regression'],
                        difficulty: 'beginner'
                    },
                    {
                        id: 'inferential-stats',
                        name: 'Inferential Statistics',
                        description: 'Drawing conclusions from sample data',
                        topics: ['Hypothesis Testing', 'Confidence Intervals', 'ANOVA', 'Chi-Square Tests'],
                        difficulty: 'intermediate',
                        prerequisites: ['probability', 'descriptive-stats']
                    }
                ]
            }
        ]
    },
    {
        id: 'physics',
        name: 'Physics',
        description: 'Fundamental laws governing matter, energy, and their interactions',
        icon: '⚛',
        color: '#10B981',
        categories: [
            {
                id: 'classical-mechanics',
                name: 'Classical Mechanics',
                description: 'Study of motion, forces, and energy in macroscopic systems',
                domain: 'physics',
                useCases: [
                    'Mechanical engineering design',
                    'Robotics and automation',
                    'Vehicle dynamics',
                    'Structural analysis',
                    'Sports biomechanics'
                ],
                fields: [
                    {
                        id: 'kinematics',
                        name: 'Kinematics',
                        description: 'Description of motion without considering forces',
                        topics: ['Position', 'Velocity', 'Acceleration', 'Projectile Motion'],
                        difficulty: 'beginner'
                    },
                    {
                        id: 'dynamics',
                        name: 'Dynamics',
                        description: 'Study of forces and their effects on motion',
                        topics: ['Newton\'s Laws', 'Free Body Diagrams', 'Friction', 'Circular Motion'],
                        difficulty: 'intermediate',
                        prerequisites: ['kinematics']
                    },
                    {
                        id: 'energy-momentum',
                        name: 'Energy and Momentum',
                        description: 'Conservation laws and energy transformations',
                        topics: ['Kinetic Energy', 'Potential Energy', 'Conservation Laws', 'Collisions'],
                        difficulty: 'intermediate',
                        prerequisites: ['dynamics']
                    },
                    {
                        id: 'rotational-motion',
                        name: 'Rotational Motion',
                        description: 'Motion of rotating objects and systems',
                        topics: ['Angular Kinematics', 'Torque', 'Moment of Inertia', 'Angular Momentum'],
                        difficulty: 'advanced',
                        prerequisites: ['dynamics', 'energy-momentum']
                    }
                ]
            },
            {
                id: 'thermodynamics',
                name: 'Thermodynamics',
                description: 'Study of heat, temperature, and energy transfer',
                domain: 'physics',
                useCases: [
                    'Engine and power plant design',
                    'Refrigeration and heating systems',
                    'Chemical process engineering',
                    'Materials science',
                    'Climate and weather systems'
                ],
                fields: [
                    {
                        id: 'thermal-properties',
                        name: 'Thermal Properties',
                        description: 'Temperature, heat capacity, and thermal expansion',
                        topics: ['Temperature Scales', 'Heat Capacity', 'Thermal Expansion', 'Phase Changes'],
                        difficulty: 'beginner'
                    },
                    {
                        id: 'laws-thermodynamics',
                        name: 'Laws of Thermodynamics',
                        description: 'Fundamental principles governing energy and entropy',
                        topics: ['First Law', 'Second Law', 'Third Law', 'Entropy'],
                        difficulty: 'intermediate',
                        prerequisites: ['thermal-properties']
                    },
                    {
                        id: 'heat-transfer',
                        name: 'Heat Transfer',
                        description: 'Mechanisms of thermal energy transport',
                        topics: ['Conduction', 'Convection', 'Radiation', 'Heat Exchangers'],
                        difficulty: 'intermediate',
                        prerequisites: ['thermal-properties']
                    }
                ]
            },
            {
                id: 'electromagnetism',
                name: 'Electromagnetism',
                description: 'Electric and magnetic phenomena and their interactions',
                domain: 'physics',
                useCases: [
                    'Electrical circuit design',
                    'Motor and generator development',
                    'Wireless communication systems',
                    'Medical imaging technology',
                    'Electromagnetic compatibility'
                ],
                fields: [
                    {
                        id: 'electrostatics',
                        name: 'Electrostatics',
                        description: 'Static electric charges and electric fields',
                        topics: ['Coulomb\'s Law', 'Electric Field', 'Gauss\'s Law', 'Electric Potential'],
                        difficulty: 'beginner'
                    },
                    {
                        id: 'magnetism',
                        name: 'Magnetism',
                        description: 'Magnetic fields and forces',
                        topics: ['Magnetic Field', 'Lorentz Force', 'Ampère\'s Law', 'Magnetic Materials'],
                        difficulty: 'intermediate'
                    },
                    {
                        id: 'electromagnetic-induction',
                        name: 'Electromagnetic Induction',
                        description: 'Changing magnetic fields and induced electric fields',
                        topics: ['Faraday\'s Law', 'Lenz\'s Law', 'Inductance', 'AC Circuits'],
                        difficulty: 'advanced',
                        prerequisites: ['electrostatics', 'magnetism']
                    }
                ]
            }
        ]
    },
    {
        id: 'aerospace',
        name: 'Aerospace Engineering',
        description: 'Design and development of aircraft and spacecraft systems',
        icon: '✈',
        color: '#8B5CF6',
        categories: [
            {
                id: 'fluid-dynamics',
                name: 'Fluid Dynamics',
                description: 'Motion of fluids and their interaction with solid boundaries',
                domain: 'aerospace',
                useCases: [
                    'Aircraft wing design',
                    'Propulsion system development',
                    'Weather prediction modeling',
                    'Turbomachinery design',
                    'Aerodynamic optimization'
                ],
                fields: [
                    {
                        id: 'fluid-statics',
                        name: 'Fluid Statics',
                        description: 'Properties and behavior of fluids at rest',
                        topics: ['Pressure', 'Hydrostatic Equilibrium', 'Buoyancy', 'Surface Tension'],
                        difficulty: 'beginner'
                    },
                    {
                        id: 'fluid-flow',
                        name: 'Fluid Flow',
                        description: 'Motion of fluids and flow patterns',
                        topics: ['Continuity Equation', 'Bernoulli\'s Equation', 'Viscosity', 'Reynolds Number'],
                        difficulty: 'intermediate',
                        prerequisites: ['fluid-statics']
                    },
                    {
                        id: 'compressible-flow',
                        name: 'Compressible Flow',
                        description: 'High-speed gas flows with density variations',
                        topics: ['Mach Number', 'Shock Waves', 'Nozzle Flow', 'Supersonic Flow'],
                        difficulty: 'advanced',
                        prerequisites: ['fluid-flow']
                    }
                ]
            },
            {
                id: 'orbital-mechanics',
                name: 'Orbital Mechanics',
                description: 'Motion of spacecraft and celestial bodies',
                domain: 'aerospace',
                useCases: [
                    'Satellite trajectory planning',
                    'Interplanetary mission design',
                    'Space station operations',
                    'Launch vehicle optimization',
                    'Space debris tracking'
                ],
                fields: [
                    {
                        id: 'two-body-problem',
                        name: 'Two-Body Problem',
                        description: 'Motion under gravitational attraction',
                        topics: ['Kepler\'s Laws', 'Orbital Elements', 'Elliptical Orbits', 'Escape Velocity'],
                        difficulty: 'intermediate'
                    },
                    {
                        id: 'orbital-maneuvers',
                        name: 'Orbital Maneuvers',
                        description: 'Changing spacecraft orbits using propulsion',
                        topics: ['Hohmann Transfer', 'Bi-elliptic Transfer', 'Plane Changes', 'Rendezvous'],
                        difficulty: 'advanced',
                        prerequisites: ['two-body-problem']
                    }
                ]
            },
            {
                id: 'propulsion',
                name: 'Propulsion Systems',
                description: 'Thrust generation for aircraft and spacecraft',
                domain: 'aerospace',
                useCases: [
                    'Jet engine design',
                    'Rocket motor development',
                    'Propeller optimization',
                    'Electric propulsion systems',
                    'Hypersonic vehicle propulsion'
                ],
                fields: [
                    {
                        id: 'jet-propulsion',
                        name: 'Jet Propulsion',
                        description: 'Thrust generation through jet exhaust',
                        topics: ['Thrust Equation', 'Specific Impulse', 'Jet Engines', 'Ramjets'],
                        difficulty: 'intermediate'
                    },
                    {
                        id: 'rocket-propulsion',
                        name: 'Rocket Propulsion',
                        description: 'Thrust generation in vacuum environments',
                        topics: ['Rocket Equation', 'Multi-stage Rockets', 'Propellants', 'Nozzle Design'],
                        difficulty: 'advanced',
                        prerequisites: ['jet-propulsion']
                    }
                ]
            }
        ]
    }
];

// Legacy exports for backward compatibility (can be removed later)
export const mathFields = stemDomains.find(d => d.id === 'math')?.categories || [];
export const scienceFields = stemDomains.find(d => d.id === 'physics')?.categories || [];
export const engineeringFields = stemDomains.find(d => d.id === 'aerospace')?.categories || [];