// Base interfaces
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface PlayerData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  questions: Question[];
}

// Question sets for each player
const jamieQuestions: Question[] = [
  {
    id: 1,
    question: "What does CEO stand for?",
    options: ["Chief Executive Officer", "Chief Economic Officer", "Central Executive Office"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What is the most common business structure for small businesses?",
    options: ["Corporation", "LLC", "Partnership", "Sole Proprietorship"],
    correctAnswer: 3
  },
  {
    id: 3,
    question: "What does ROI stand for in business?",
    options: ["Rate of Interest", "Return on Investment", "Risk of Investment", "Revenue of Income"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Which company is known for the slogan 'Just Do It'?",
    options: ["Adidas", "Nike", "Puma", "Reebok"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What is the currency used in the United Kingdom?",
    options: ["Euro", "Dollar", "Pound Sterling", "Franc"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "What is the break-even point in business?",
    options: ["When costs equal revenue", "When profit is maximized", "When losses are minimized", "When investment is recovered"],
    correctAnswer: 0
  },
  {
    id: 7,
    question: "Which financial statement shows a company's assets, liabilities, and equity?",
    options: ["Income Statement", "Cash Flow Statement", "Balance Sheet", "Profit & Loss Statement"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "What does IPO stand for?",
    options: ["Internal Public Offering", "Initial Public Offering", "International Private Organization", "Investment Portfolio Option"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "Which business model involves recurring revenue from customers?",
    options: ["Franchise", "Subscription", "Retail", "Wholesale"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What is market capitalization?",
    options: ["Total company revenue", "Company's total debt", "Share price × number of shares", "Annual profit"],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "What is the Efficient Market Hypothesis?",
    options: ["Markets always crash", "Stock prices reflect all available information", "Only professionals can beat the market", "Markets are always irrational"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "Which economic indicator measures the change in prices of goods and services?",
    options: ["GDP", "CPI", "PPI", "PMI"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "What is arbitrage in finance?",
    options: ["Long-term investing", "Risk-free profit from price differences", "High-risk speculation", "Government bonds trading"],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "What does EBITDA stand for?",
    options: ["Earnings Before Interest, Taxes, Depreciation, and Amortization", "Economic Business Income Tax Deduction Analysis", "European Banking Interest and Trade Data", "Estimated Business Investment and Development Assets"],
    correctAnswer: 0
  },
  {
    id: 15,
    question: "Which theory suggests that investors are not always rational?",
    options: ["Efficient Market Theory", "Modern Portfolio Theory", "Behavioral Finance Theory", "Capital Asset Pricing Model"],
    correctAnswer: 2
  }
];

const sethQuestions: Question[] = [
  {
    id: 16,
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "HO2"],
    correctAnswer: 0
  },
  {
    id: 17,
    question: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "226"],
    correctAnswer: 1
  },
  {
    id: 18,
    question: "What gas do plants absorb from the atmosphere during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 2
  },
  {
    id: 19,
    question: "What is the nearest planet to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "What does DNA stand for?",
    options: ["Deoxyribonucleic Acid", "Dinitrogen Acid", "Dynamic Nuclear Acid", "Deoxy Nuclear Acid"],
    correctAnswer: 0
  },
  {
    id: 21,
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    correctAnswer: 1
  },
  {
    id: 22,
    question: "What type of bond holds water molecules together?",
    options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"],
    correctAnswer: 2
  },
  {
    id: 23,
    question: "What is the SI unit for electric current?",
    options: ["Volt", "Watt", "Ampere", "Ohm"],
    correctAnswer: 2
  },
  {
    id: 24,
    question: "Which scientist developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
    correctAnswer: 1
  },
  {
    id: 25,
    question: "What is the chemical formula for methane?",
    options: ["CH4", "C2H6", "CO2", "H2SO4"],
    correctAnswer: 0
  },
  {
    id: 26,
    question: "What is the Heisenberg Uncertainty Principle?",
    options: ["Energy cannot be created or destroyed", "You cannot simultaneously know position and momentum precisely", "Time is relative to the observer", "Matter and energy are equivalent"],
    correctAnswer: 1
  },
  {
    id: 27,
    question: "What is the name of the theoretical boundary around a black hole?",
    options: ["Photon Sphere", "Event Horizon", "Singularity", "Accretion Disk"],
    correctAnswer: 1
  },
  {
    id: 28,
    question: "Which enzyme is responsible for unwinding DNA during replication?",
    options: ["DNA Polymerase", "Helicase", "Ligase", "Primase"],
    correctAnswer: 1
  },
  {
    id: 29,
    question: "What is the half-life of Carbon-14?",
    options: ["5,730 years", "1,600 years", "10,000 years", "50,000 years"],
    correctAnswer: 0
  },
  {
    id: 30,
    question: "What particle is exchanged in electromagnetic interactions?",
    options: ["Gluon", "W Boson", "Photon", "Higgs Boson"],
    correctAnswer: 2
  }
];

const samCQuestions: Question[] = [
  {
    id: 31,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
  {
    id: 32,
    question: "What is the term for a persistent, irrational fear of a specific object or situation?",
    options: ["Phobia", "Delusion", "Obsession", "Compulsion"],
    correctAnswer: 0
  },
  {
    id: 33,
    question: "Which psychologist developed the hierarchy of needs?",
    options: ["Abraham Maslow", "Erik Erikson", "Jean Piaget", "John Watson"],
    correctAnswer: 0
  },
  {
    id: 34,
    question: "What is the main focus of cognitive psychology?",
    options: ["Mental processes", "Unconscious motives", "Behavioral conditioning", "Social influences"],
    correctAnswer: 0
  },
  {
    id: 35,
    question: "Which term describes learning by observing others?",
    options: ["Classical conditioning", "Operant conditioning", "Observational learning", "Latent learning"],
    correctAnswer: 2
  },
  {
    id: 36,
    question: "What is the placebo effect?",
    options: ["Improvement due to belief in treatment", "Negative reaction to medication", "Memory loss", "Unconscious motivation"],
    correctAnswer: 0
  },
  {
    id: 37,
    question: "Which psychologist is known for the stages of cognitive development?",
    options: ["Jean Piaget", "Albert Bandura", "Erik Erikson", "Sigmund Freud"],
    correctAnswer: 0
  },
  {
    id: 38,
    question: "What is the term for a split between thoughts, emotions, and behavior, often seen in schizophrenia?",
    options: ["Dissociation", "Regression", "Displacement", "Projection"],
    correctAnswer: 0
  },
  {
    id: 39,
    question: "Which part of the brain is most associated with decision making and personality?",
    options: ["Frontal lobe", "Occipital lobe", "Temporal lobe", "Parietal lobe"],
    correctAnswer: 0
  },
  {
    id: 40,
    question: "What is the psychological term for a false sensory perception?",
    options: ["Hallucination", "Illusion", "Delusion", "Obsession"],
    correctAnswer: 0
  },
  {
    id: 41,
    question: "Which psychologist is famous for the 'Bobo doll' experiment?",
    options: ["Albert Bandura", "John Watson", "Carl Rogers", "Abraham Maslow"],
    correctAnswer: 0
  },
  {
    id: 42,
    question: "What is the term for the tendency to recall the first and last items in a list best?",
    options: ["Serial position effect", "Priming", "Chunking", "Encoding specificity"],
    correctAnswer: 0
  },
  {
    id: 43,
    question: "Which disorder is characterized by alternating periods of mania and depression?",
    options: ["Bipolar disorder", "Schizophrenia", "Obsessive-compulsive disorder", "Generalized anxiety disorder"],
    correctAnswer: 0
  },
  {
    id: 44,
    question: "What is the defense mechanism where unacceptable impulses are attributed to others?",
    options: ["Projection", "Denial", "Rationalization", "Sublimation"],
    correctAnswer: 0
  },
  {
    id: 45,
    question: "Which psychologist developed the concept of 'self-actualization'?",
    options: ["Abraham Maslow", "Carl Rogers", "Sigmund Freud", "Erik Erikson"],
    correctAnswer: 0
  }
];

const samWQuestions: Question[] = [
  {
    id: 46,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

const mattQuestions: Question[] = [
  {
    id: 61,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
  {
    id: 62,
    question: "who farted on ma dick",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

const katieQuestions: Question[] = [
  {
    id: 76,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

const joshQuestions: Question[] = [
  {
    id: 91,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

const kiwiQuestions: Question[] = [
  {
    id: 106,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

const emmyQuestions: Question[] = [
  {
    id: 121,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

const harryQuestions: Question[] = [
  {
    id: 136,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

const benWQuestions: Question[] = [
  {
    id: 151,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

const berboQuestions: Question[] = [
  {
    id: 166,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

const benGQuestions: Question[] = [
  {
    id: 181,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];
const livQuestions: Question[] = [
  {
    id: 196,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];
const sarkieQuestions: Question[] = [
  {
    id: 211,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

const exampleQuestions: Question[] = [
  {
    id: 226,
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    correctAnswer: 0
  },
];

// ...existing code..
  // ...other players...

// Player database - easily add new players here
export const players: Record<string, PlayerData> = {
  example: {
    id: 'example',
    name: 'Example',
    emoji: '🙂',
    description: 'Example Description',
    questions: exampleQuestions
  },
  jamie: {
    id: 'jamie',
    name: 'Jamie',
    emoji: '🐲',
    description: 'DnD',
    questions: jamieQuestions
  },
  seth: {
    id: 'seth',
    name: 'Seth',
    emoji: '🐳',
    description: 'Pokemon Gen3-6',
    questions: sethQuestions
  },
  samC: {
    id: 'samC',
    name: 'Sam C',
    emoji: '🧠', 
    description: 'Psychology',
    questions: samCQuestions
  },
  samW: {
    id: 'samW',
    name: 'Sam W',
    emoji: '🦖', 
    description: 'Dinosaurs',
    questions: samWQuestions
  },
  matt: {
    id: 'matt',
    name: 'Matt',
    emoji: '🔫',
    description: 'Overwatch',
    questions: mattQuestions
  },
  katie: {
    id: 'katie',
    name: 'Katie',
    emoji: '📺',
    description: 'The Big Bang Theory',
    questions: katieQuestions
  },
  josh: {
    id: 'josh',
    name: 'Josh',
    emoji: '👨‍💼',
    description: 'UK Politics',
    questions: joshQuestions
  },
  kiwi: {
    id: 'kiwi',
    name: 'Kiwi',
    emoji: '😭',
    description: 'The Binding of Isaac',
    questions: kiwiQuestions
  },
  emmy: {
    id: 'emmy',
    name: 'Emmy',
    emoji: '🤖',
    description: 'Cyberpunk',
    questions: emmyQuestions
  },
  harry: {
    id: 'harry',
    name: 'Harry',
    emoji: '💂‍♂️',
    description: 'US Civil War',
    questions: harryQuestions
  },
  benW: {
    id: 'benW',
    name: 'Ben W',
    emoji: '🧜‍♂️',
    description: 'Greek Mythology',
    questions: benWQuestions
  },
  berbo: {
    id: 'berbo',
    name: 'Berbo',
    emoji: '🦔',
    description: 'Sonic',
    questions: berboQuestions
  },
  benG: {
    id: 'benG',
    name: 'Ben G',
    emoji: '🏆',
    description: 'LoL Esports',
    questions: benGQuestions
  },
  liv: {
    id: 'liv',
    name: 'Liv',
    emoji: '👱‍♀️',
    description: 'Taylor Swift',
    questions: livQuestions
  },
  sarkie: {
    id: 'sarkie',
    name: 'Sarkie',
    emoji: '👨‍🌾',
    description: 'Stardew Valley',
    questions: sarkieQuestions
  }
  // To add a new player, simply add a new entry here:
  // newPlayer: {
  //   id: 'newPlayer',
  //   name: 'New Player Name',
  //   emoji: '🎭',
  //   description: 'Player Description',
  //   questions: newPlayerQuestions
  // }
};

// Utility types and functions
export type Player = keyof typeof players;
export const playerIds = Object.keys(players) as Player[];

// Helper functions
export const getPlayer = (playerId: Player): PlayerData => {
  return players[playerId];
};

export const getPlayerQuestions = (playerId: Player): Question[] => {
  return players[playerId]?.questions || [];
};

export const getAllPlayers = (): PlayerData[] => {
  return Object.values(players);
};

export const getPlayerById = (id: string): PlayerData | undefined => {
  return players[id as Player];
};

// Legacy compatibility function (for existing code)
export const getQuestionsByPlayer = (playerId: Player): Question[] => {
  return getPlayerQuestions(playerId);
};

// Flattened questions array (if needed for backward compatibility)
export const questions: Question[] = Object.values(players).flatMap(player => player.questions);

// Validation function
export const validatePlayerData = (playerData: PlayerData): boolean => {
  if (!playerData.id || !playerData.name || !playerData.questions) {
    return false;
  }
  
  // Check if all questions have unique IDs
  const questionIds = playerData.questions.map(q => q.id);
  const uniqueIds = new Set(questionIds);
  if (questionIds.length !== uniqueIds.size) {
    console.warn(`Player ${playerData.name} has duplicate question IDs`);
    return false;
  }
  
  return true;
};

// Function to validate that all players have unique question IDs
export const validateAllPlayers = (): boolean => {
  const allQuestionIds: number[] = [];
  const allPlayers = Object.values(players);
  
  for (const player of allPlayers) {
    for (const question of player.questions) {
      if (allQuestionIds.includes(question.id)) {
        console.error(`Duplicate question ID ${question.id} found across players`);
        return false;
      }
      allQuestionIds.push(question.id);
    }
  }
  
  console.log(`✅ All ${allQuestionIds.length} questions have unique IDs across ${allPlayers.length} players`);
  return true;
};

// Function to get random questions from a player's set
export const getRandomPlayerQuestions = (playerId: Player, count?: number): Question[] => {
  const playerQuestions = getPlayerQuestions(playerId);
  if (!count || count >= playerQuestions.length) {
    return [...playerQuestions].sort(() => Math.random() - 0.5);
  }
  
  const shuffled = [...playerQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Function to add a new player dynamically (if needed at runtime)
export const addPlayer = (playerData: PlayerData): boolean => {
  if (!validatePlayerData(playerData)) {
    return false;
  }
  
  if (players[playerData.id]) {
    console.warn(`Player with ID ${playerData.id} already exists`);
    return false;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (players as any)[playerData.id] = playerData;
  return true;
};
