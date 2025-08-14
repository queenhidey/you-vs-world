# How to Add New Players and Questions

This guide shows how easy it is to add new players and questions to the Chase game.

## 🎯 Player-Specific Random Question System

Each player has their own **unique question set** that is **randomly selected** during gameplay:

- ✅ **Unique Questions**: Each player has completely separate questions
- ✅ **Random Selection**: Questions are randomly chosen from the player's set
- ✅ **No Repeats**: Questions won't repeat until all questions are used
- ✅ **Auto-Reset**: When all questions are used, the system resets and shuffles again
- ✅ **Validation**: Automatic checking ensures all question IDs are unique across players

## Adding a New Player

### Step 1: Create the questions array
```typescript
const sarahQuestions: Question[] = [
  {
    id: 31, // Make sure IDs are unique across all players
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 32,
    question: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "English", "French"],
    correctAnswer: 1
  },
  // Add more questions...
];
```

### Step 2: Add the player to the players object
```typescript
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
  },
  // NEW PLAYER - just add here!
  sarah: {
    id: 'sarah',
    name: 'Sarah',
    emoji: '🌍',
    description: 'Geography Expert',
    questions: sarahQuestions
  }
};
```

That's it! The new player will automatically appear in the character selection screen.

## Adding Questions to Existing Players

Simply add new question objects to the existing question arrays:

```typescript
const jimmyQuestions: Question[] = [
  // ... existing questions ...
  {
    id: 50, // Make sure ID is unique
    question: "What does B2B stand for in business?",
    options: ["Business to Business", "Back to Basics", "Buy to Build", "Brand to Brand"],
    correctAnswer: 0
  }
];
```

## Removing Players

To remove a player, simply delete their entry from the `players` object:

```typescript
export const players: Record<string, PlayerData> = {
  // Remove jimmy by deleting this entire block:
  // jimmy: { ... },
  
  michael: {
    id: 'michael',
    name: 'Michael',
    emoji: '👨‍🔬',
    description: 'Science Expert',
    questions: michaelQuestions
  }
};
```

## Features of the New System

✅ **Automatic UI Updates**: New players appear automatically in the selection screen
✅ **Type Safety**: TypeScript ensures all players have the required properties
✅ **Validation**: Built-in validation prevents duplicate question IDs
✅ **Extensible**: Easy to add more player metadata (themes, difficulty, etc.)
✅ **Maintainable**: Each player's questions are clearly separated
✅ **Backward Compatible**: Existing code continues to work

## Available Helper Functions

- `getPlayer(playerId)` - Get full player data
- `getPlayerQuestions(playerId)` - Get just the questions
- `getAllPlayers()` - Get all available players
- `validatePlayerData(player)` - Validate a player object
- `validateAllPlayers()` - Validate all players have unique question IDs
- `addPlayer(playerData)` - Add a player at runtime (if needed)
- `getRandomPlayerQuestions(playerId, count)` - Get random questions from a player's set

## 🎲 Random Question System Features

### How It Works:
1. **Game Start**: Random question selected from player's unique set
2. **Next Question**: Another random question selected (no repeats)
3. **Question Tracking**: System tracks used questions to prevent duplicates
4. **Auto-Reset**: When all questions used, system resets and starts over
5. **Validation**: Checks that no two players share question IDs

### Benefits:
- **Replayability**: Same player feels different each game
- **Fair Distribution**: All questions eventually appear
- **No Patterns**: Players can't memorize question order
- **Scalable**: Works with any number of questions per player

## Question ID Management

Question IDs must be unique across ALL players. Current ranges:
- Jimmy: 1-15
- Michael: 16-30
- Available: 31+ (for new players/questions)
