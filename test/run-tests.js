#!/usr/bin/env node

/**
 * Test Runner Script for You vs World Chase Game
 * 
 * This script provides a convenient way to run different types of tests
 * with appropriate configurations and reporting.
 */

const { execSync } = require('child_process');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n🧪 ${description}`, 'cyan');
  log(`Running: ${command}`, 'yellow');
  
  try {
    execSync(command, { 
      stdio: 'inherit', 
      cwd: process.cwd() 
    });
    log(`✅ ${description} completed successfully`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} failed`, 'red');
    return false;
  }
}

function showHelp() {
  log('\n🎮 You vs World Chase Game - Test Runner', 'bright');
  log('================================================', 'blue');
  log('\nAvailable commands:', 'bright');
  log('  npm run test               - Run all tests', 'cyan');
  log('  npm run test:watch         - Run tests in watch mode', 'cyan');
  log('  npm run test:ui            - Run tests with UI interface', 'cyan');
  log('  npm run test:coverage      - Run tests with coverage report', 'cyan');
  log('  npm run test questions     - Run only questions tests', 'cyan');
  log('  npm run test GameBoard     - Run only GameBoard tests', 'cyan');
  log('  npm run test QuestionCard  - Run only QuestionCard tests', 'cyan');
  log('  npm run test ChaseGame     - Run only ChaseGame tests', 'cyan');
  log('  npm run test integration   - Run only integration tests', 'cyan');
  log('  npm run test utilities     - Run only utility tests', 'cyan');
  
  log('\nTest Categories:', 'bright');
  log('  📊 Unit Tests      - Individual component testing', 'magenta');
  log('  🔗 Integration     - Component interaction testing', 'magenta');
  log('  🛠️  Utilities      - Helper function testing', 'magenta');
  log('  📱 Components      - UI component testing', 'magenta');
  log('  💾 Data Layer     - Question data testing', 'magenta');
  
  log('\nTest Files:', 'bright');
  log('  test/questions.test.ts     - Question data management', 'yellow');
  log('  test/GameBoard.test.tsx    - Game board component', 'yellow');
  log('  test/QuestionCard.test.tsx - Question display component', 'yellow');
  log('  test/ChaseGame.test.tsx    - Main game logic', 'yellow');
  log('  test/integration.test.tsx  - Full app integration', 'yellow');
  log('  test/utilities.test.ts     - Game logic utilities', 'yellow');
  
  log('\nCoverage Reports:', 'bright');
  log('  HTML Report: coverage/index.html', 'green');
  log('  JSON Report: coverage/coverage.json', 'green');
  log('  LCOV Report: coverage/lcov.info', 'green');
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'all':
      log('\n🚀 Running Complete Test Suite', 'bright');
      runCommand('npm run test', 'All Tests');
      break;
      
    case 'watch':
      log('\n👀 Starting Test Watch Mode', 'bright');
      runCommand('npm run test:watch', 'Watch Mode');
      break;
      
    case 'ui':
      log('\n🖥️  Starting Test UI', 'bright');
      runCommand('npm run test:ui', 'Test UI');
      break;
      
    case 'coverage':
      log('\n📊 Running Tests with Coverage', 'bright');
      runCommand('npm run test:coverage', 'Coverage Report');
      break;
      
    case 'quick':
      log('\n⚡ Running Quick Test Suite', 'bright');
      runCommand('npm run test -- --run', 'Quick Tests');
      break;
      
    case 'unit':
      log('\n🔬 Running Unit Tests Only', 'bright');
      runCommand('npm run test questions utilities', 'Unit Tests');
      break;
      
    case 'components':
      log('\n🧩 Running Component Tests Only', 'bright');
      runCommand('npm run test GameBoard QuestionCard ChaseGame', 'Component Tests');
      break;
      
    case 'integration':
      log('\n🔗 Running Integration Tests Only', 'bright');
      runCommand('npm run test integration', 'Integration Tests');
      break;
      
    case 'debug':
      log('\n🐛 Running Tests in Debug Mode', 'bright');
      runCommand('npm run test -- --reporter=verbose', 'Debug Tests');
      break;
      
    case 'ci':
      log('\n🤖 Running CI Test Suite', 'bright');
      let success = true;
      success &= runCommand('npm run test -- --run', 'Unit Tests');
      success &= runCommand('npm run test:coverage', 'Coverage Report');
      
      if (success) {
        log('\n✅ All CI tests passed!', 'green');
      } else {
        log('\n❌ Some CI tests failed!', 'red');
        process.exit(1);
      }
      break;
      
    default:
      log(`❓ Unknown command: ${command}`, 'red');
      showHelp();
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { runCommand, log };
