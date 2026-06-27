// Test multiple arguments feature
// Run with: bun tests/multiple-args.test.ts

import log from '../dist/index.js';

console.log('\n=== Testing Multiple Arguments Support ===\n');

// Test 1: Multiple strings
log.info('Test 1:', 'Multiple', 'strings');

// Test 2: Mixed types
log.success('Status:', 200, 'Message:', 'OK');

// Test 3: Object with label
const userData = { name: 'John', age: 30, role: 'Developer' };
log.info('User Object:', userData);

// Test 4: Multiple objects
const status = { code: 200, ok: true };
const headers = { 'content-type': 'application/json' };
log.success('Response:', status, 'Headers:', headers);

// Test 5: Array
const items = ['apple', 'banana', 'orange'];
log.warn('Items:', items);

// Test 6: Error object
const error = new Error('Something went wrong');
log.error('Error occurred:', error.message, 'Stack:', error.stack);

// Test 7: Numbers and booleans
log.info('Count:', 42, 'Active:', true, 'Score:', 98.5);

// Test 8: Traditional single argument (backward compatibility)
log.success('Single argument still works');

console.log('\n=== Multiple Arguments Tests Complete ===\n');
console.log('✅ If you see multiple values in each log line, the feature is working!\n');
