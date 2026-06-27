// Manual test script for hardlog
// Run with: bun tests/manual.test.ts

import log from '../dist/index.js';

console.log('=== Testing hardlog ===\n');

// Test all log levels
console.log('1. Testing all log levels:');
log.success('✅ Success message test');
log.error('❌ Error message test');
log.warn('⚠️  Warning message test');
log.info('ℹ️  Info message test');

// Test configuration - timestamp
console.log('\n2. Testing with timestamp enabled:');
log.config({ showTimestamp: true });
log.info('Message with timestamp');

// Test configuration - chaining
console.log('\n3. Testing configuration chaining:');
log.config({ showTimestamp: false }).success('Chained config works!');

// Test production mode
console.log('\n4. Testing production mode (should NOT show logs):');
const originalEnv = process.env.NODE_ENV;
process.env.NODE_ENV = 'production';
// Manually set config for test scope
log.config({ enabled: false });
log.info('This should NOT appear in production');
log.success('This should also NOT appear');

// Re-enable for development
console.log('\n5. Re-enabling for development:');
process.env.NODE_ENV = originalEnv;
log.config({ enabled: true });
log.success('Back in development mode');

// Test with different message types
console.log('\n6. Testing with various message types:');
log.info('Plain string');
log.success('Message with "quotes"');
log.warn('Message with special chars: !@#$%^&*()');
log.error('Message with emoji: 🚀 🎉 ✨');

// Test edge cases
console.log('\n7. Testing edge cases:');
log.info('');  // Empty string
log.success('Very long message: ' + 'a'.repeat(200));

console.log('\n=== All manual tests complete ===');
console.log('✅ If you see styled, colorful logs above, hardlog is working correctly!');
