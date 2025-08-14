# Component Structure Refactor

This project has been refactored to have a well-organized component structure separated by functionality and game states.

## New Folder Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx         # Configurable button component
│   │   ├── Card.tsx           # Glass/solid card layouts
│   │   ├── Timer.tsx          # Timer display with variants
│   │   └── index.ts           # Barrel exports
│   ├── features/              # Feature-specific components
│   │   ├── ChaseGame.tsx      # Main game orchestrator
│   │   ├── GameBoard.tsx      # Game board display and logic
│   │   ├── QuestionCard.tsx   # Question display and answering
│   │   ├── ManualControls.tsx # Manual game controls
│   │   └── index.ts           # Barrel exports
│   ├── game-states/           # Components organized by game state
│   │   ├── MenuState.tsx      # Main menu/home screen
│   │   ├── PlayerSelectState.tsx  # Player selection screen
│   │   ├── GameSetupState.tsx # Game setup (position selection)
│   │   ├── PlayingState.tsx   # Main playing interface
│   │   ├── GameResultState.tsx # Win/lose results
│   │   └── index.ts           # Barrel exports
│   └── index.ts               # Main barrel export
├── types/
│   └── game.ts                # TypeScript type definitions
├── utils/
│   ├── audioService.ts        # Audio effects service
│   └── utilities.ts           # Game logic utilities
└── app/
    ├── data/
    │   └── questions.ts       # Questions and player data
    ├── hooks/
    │   └── useGameState.ts    # Game state management hook
    └── page.tsx               # Main page component
```

## Component Organization

### UI Components (`src/components/ui/`)
Reusable UI building blocks that can be used across the application:
- **Button**: Configurable button with variants (primary, secondary, danger, etc.)
- **Card**: Glass and solid card layouts for content sections
- **Timer**: Timer display with automatic color coding based on time remaining

### Feature Components (`src/components/features/`)
Components that implement specific game features:
- **ChaseGame**: Main game orchestrator that manages all game state and logic
- **GameBoard**: Displays the chase board with player/chaser positions
- **QuestionCard**: Handles question display and answer selection
- **ManualControls**: Manual game controls for advancing players/chasers

### Game State Components (`src/components/game-states/`)
Components organized by the current state of the game:
- **MenuState**: Initial welcome screen with game instructions
- **PlayerSelectState**: Screen for choosing which player to play as
- **GameSetupState**: Setup phase for entering drink labels and selecting starting position
- **PlayingState**: Main playing interface that combines all game features
- **GameResultState**: Win/lose screen with replay options

## Key Benefits

1. **Separation of Concerns**: Each component has a single, well-defined responsibility
2. **Reusability**: UI components can be easily reused across different parts of the app
3. **Maintainability**: Game state components make it easy to understand the flow
4. **Type Safety**: Comprehensive TypeScript types for all component props
5. **Clean Imports**: Barrel exports make imports cleaner and more organized
6. **Scalability**: Easy to add new UI components, features, or game states

## Import Examples

```typescript
// Import specific UI components
import { Button, Card, Timer } from '../components/ui';

// Import specific feature components  
import { GameBoard, QuestionCard } from '../components/features';

// Import specific game state components
import { MenuState, PlayingState } from '../components/game-states';

// Import everything from a category
import * as UI from '../components/ui';
```

## Adding New Components

### Adding a new UI component:
1. Create the component in `src/components/ui/NewComponent.tsx`
2. Export it in `src/components/ui/index.ts`
3. It will automatically be available via the main barrel export

### Adding a new feature:
1. Create the component in `src/components/features/NewFeature.tsx`
2. Export it in `src/components/features/index.ts`
3. Add any new types to `src/types/game.ts`

### Adding a new game state:
1. Create the component in `src/components/game-states/NewState.tsx`
2. Export it in `src/components/game-states/index.ts`
3. Wire it into the main game flow in `ChaseGame.tsx` or `page.tsx`

## Audio Service

The `AudioService` is a singleton service that provides game audio effects:
- **playAlarmSound()**: Rapid beeping when timer expires
- **playWarningBeep()**: Single beep for countdown warnings  
- **playSuccessSound()**: Ascending notes for success
- **playErrorSound()**: Descending notes for errors

## Type Definitions

All TypeScript interfaces and types are centralized in `src/types/game.ts` for easy maintenance and reuse across components.
