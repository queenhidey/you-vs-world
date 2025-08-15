import { PlayerData } from "./contestantControls";

import { exampleQuestions } from "./questions/exampleQuestions";
import { benGQuestions } from "./questions/benGQuestions";
import { benWQuestions } from "./questions/benWQuestions";
import { berboQuestions } from "./questions/berboQuestions";
import { emmyQuestions } from "./questions/emmyQuestions";
import { harryQuestions } from "./questions/harryQuestions";
import { jamieQuestions } from "./questions/jamieQuestions";
import { joshQuestions } from "./questions/joshQuestions";
import { katieQuestions } from "./questions/katieQuestions";
import { kiwiQuestions } from "./questions/kiwiQuestions";
import { livQuestions } from "./questions/livQuestions";
import { mattQuestions } from "./questions/mattQuestions";
import { samCQuestions } from "./questions/samCQuestions";
import { samWQuestions } from "./questions/samWQuestions";
import { sarkieQuestions } from "./questions/sarkieQuestions";
import { sethQuestions } from "./questions/sethQuestions";


export const players: Record<string, PlayerData> = {
  example: {
    id: 'example',
    name: 'Example',
    emoji: '🙂',
    description: 'Example Questions',
    questions: exampleQuestions
  },
  jamie: {
    id: 'jamie',
    name: 'Jamie',
    emoji: '🐲',
    description: 'Dungeons and Dragons',
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
    description: 'The Big Bang Theory (show)',
    questions: katieQuestions
  },
  josh: {
    id: 'josh',
    name: 'Josh',
    emoji: '👨‍💼',
    description: 'UK Politics (past century)',
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
    description: 'League of Legends Esport',
    questions: benGQuestions
  },
  liv: {
    id: 'liv',
    name: 'Liv',
    emoji: '👱‍♀️',
    description: '???',
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