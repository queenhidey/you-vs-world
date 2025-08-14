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
const jimmyQuestions: Question[] = [
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

const michaelQuestions: Question[] = [
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

// Player database - easily add new players here
export const players: Record<string, PlayerData> = {
  jimmy: {
    id: 'jimmy',
    name: 'Jimmy',
    emoji: '👨‍💼',
    description: 'Business Expert',
    questions: jimmyQuestions
  },
  michael: {
    id: 'michael',
    name: 'Michael',
    emoji: '👨‍🔬',
    description: 'Science Expert',
    questions: michaelQuestions
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
