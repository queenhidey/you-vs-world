# Test Suite for You vs World Chase Game

This comprehensive test suite covers all aspects of the Chase UK game implementation using Vitest and React Testing Library.

## Test Structure

### 📁 Test Files Overview

#### `test/questions.test.ts`
Tests the core data layer and question management:
- Player data validation
- Question structure validation
- Random question selection logic
- Data integrity checks
- Question uniqueness validation

#### `test/GameBoard.test.tsx`
Tests the game board component:
- Visual rendering of game state
- Setup phase interactions (text inputs → buttons)
- Position selection logic
- Step color management during setup vs game phases
- Player/chaser position display
- Game status indicators (danger, caught, winning)

#### `test/QuestionCard.test.tsx`
Tests the question display and interaction component:
- Question rendering
- Player answer selection
- Chaser selection phase
- Answer reveal functionality
- Visual state management (borders, colors)
- Disabled states

#### `test/ChaseGame.test.tsx`
Tests the main game logic component:
- Game state management
- Setup phase validation
- Timer functionality and audio
- Manual controls (advance/unadvance)
- Button state management
- Answer flow progression
- Win/lose conditions

#### `test/integration.test.tsx`
Tests full application integration:
- Character selection → game flow
- Component communication
- State persistence across phases
- Error handling
- Performance benchmarks
- Accessibility features

#### `test/utilities.test.ts`
Tests game logic utility functions:
- Position calculations
- Distance measurements
- Timer utilities
- Question selection algorithms
- Setup validation logic
- Button state determination

## 🎯 Test Coverage Areas

### Core Functionality
- ✅ Question data management and validation
- ✅ Game setup phase (text inputs, position selection)
- ✅ Timer countdown with audio alerts
- ✅ Player and chaser answer mechanics
- ✅ Position advancement logic
- ✅ Win/lose condition detection

### User Interface
- ✅ Component rendering
- ✅ Interactive elements (buttons, inputs)
- ✅ Visual state changes (colors, borders)
- ✅ Responsive design elements
- ✅ Accessibility features

### Game Logic
- ✅ State transitions (setup → game → end)
- ✅ Button enable/disable logic
- ✅ Manual control validation
- ✅ Question progression
- ✅ Score calculation

### Error Handling
- ✅ Invalid data scenarios
- ✅ Audio API unavailability
- ✅ Component error boundaries
- ✅ Edge case handling

## 🚀 Running Tests

### Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Run All Tests
\`\`\`bash
npm run test
\`\`\`

### Run Tests in Watch Mode
\`\`\`bash
npm run test:watch
\`\`\`

### Run Tests with UI
\`\`\`bash
npm run test:ui
\`\`\`

### Run Tests with Coverage Report
\`\`\`bash
npm run test:coverage
\`\`\`

### Run Specific Test Files
\`\`\`bash
# Test only questions data
npm run test questions

# Test only components
npm run test GameBoard

# Test only integration
npm run test integration
\`\`\`

## 🛠️ Test Configuration

### Vitest Config (`vitest.config.ts`)
- **Environment**: jsdom (for DOM testing)
- **Setup Files**: Global test setup with mocks
- **Aliases**: Path aliases for clean imports
- **Coverage**: Istanbul-based coverage reporting

### Setup File (`test/setup.ts`)
- **Audio API Mocking**: Mock Web Audio API for timer sounds
- **Timer Mocking**: Fake timers for controlled testing
- **Jest DOM Matchers**: Extended matchers for DOM testing

## 🎨 Mock Strategy

### Component Mocks
- Child components are mocked in integration tests to isolate behavior
- Audio API is mocked to prevent browser compatibility issues
- Timers are mocked for predictable testing

### Data Mocks
- Question data uses real structure with test content
- Player data maintains actual format
- State management uses controlled test scenarios

## 📊 Test Categories

### Unit Tests (70% of coverage)
- Individual component testing
- Utility function validation
- Data layer testing
- Isolated logic verification

### Integration Tests (25% of coverage)
- Component interaction testing
- State flow validation
- User journey testing
- Error boundary testing

### End-to-End Simulation (5% of coverage)
- Full game flow testing
- Performance benchmarking
- Accessibility validation
- Cross-browser simulation

## 🔍 Key Test Scenarios

### Game Setup Flow
1. ✅ Character selection (dynamic player support)
2. ✅ Step label input validation
3. ✅ Position selection requirement
4. ✅ Start game button enablement

### Gameplay Flow
1. ✅ Timer countdown and audio alerts
2. ✅ Player answer selection
3. ✅ Chaser selection phase
4. ✅ Answer reveal and scoring
5. ✅ Position advancement
6. ✅ Next question progression

### Manual Controls
1. ✅ Player/chaser position manipulation
2. ✅ "Didn't answer" button states
3. ✅ Button disable after use
4. ✅ State reset on new question

### End Game Scenarios
1. ✅ Player wins (reaches finish)
2. ✅ Player caught by chaser
3. ✅ Game restart functionality

## 🏆 Quality Metrics

### Coverage Targets
- **Lines**: >90%
- **Functions**: >95%
- **Branches**: >85%
- **Statements**: >90%

### Performance Targets
- **Initial Render**: <1000ms
- **State Transitions**: <100ms
- **Component Updates**: <50ms

### Accessibility Targets
- **ARIA Labels**: 100% coverage
- **Keyboard Navigation**: Full support
- **Screen Reader**: Compatible
- **Color Contrast**: WCAG AA compliant

## 🐛 Debugging Tests

### Common Issues
1. **Timer Tests**: Ensure fake timers are properly configured
2. **Audio Tests**: Verify Audio API mocking
3. **State Tests**: Check mock cleanup between tests
4. **DOM Tests**: Confirm jsdom environment setup

### Debug Commands
\`\`\`bash
# Run single test with debug output
npm run test -- --reporter=verbose GameBoard

# Run tests with debugging
npm run test -- --inspect-brk

# View test coverage details
npm run test:coverage -- --reporter=html
\`\`\`

## 📝 Test Maintenance

### Adding New Tests
1. Follow existing file naming convention
2. Use describe/it structure for organization
3. Include setup/teardown as needed
4. Mock external dependencies appropriately

### Updating Tests
1. Update tests when changing component APIs
2. Maintain test coverage when adding features
3. Update mocks when external APIs change
4. Keep integration tests synchronized with unit tests

This test suite ensures the Chase UK game is robust, reliable, and maintains high quality standards throughout development and deployment.
