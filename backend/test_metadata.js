// Test script for metadata truncation function
import { truncateMetadataValue } from './test_truncate.js';

console.log('Testing metadata truncation function...');

// Test 1: Long string (should be truncated)
const longString = 'A'.repeat(600); // 600 characters
const truncated = truncateMetadataValue(longString);
console.log(`Test 1 - Long string: Original length: ${longString.length}, Truncated length: ${truncated.length}`);
console.log(`Expected: 500, Actual: ${truncated.length}, Pass: ${truncated.length === 500}`);

// Test 2: Short string (should remain unchanged)
const shortString = 'Hello World';
const unchanged = truncateMetadataValue(shortString);
console.log(`Test 2 - Short string: Original: "${shortString}", Result: "${unchanged}", Pass: "${shortString}" === "${unchanged}"`);

// Test 3: Non-string value (should convert to string)
const numberValue = 12345;
const stringified = truncateMetadataValue(numberValue);
console.log(`Test 3 - Number conversion: Original: ${numberValue}, Result: "${stringified}", Type: ${typeof stringified}, Pass: typeof stringified === 'string'`);

// Test 4: Empty value (should return empty string)
const emptyValue = null;
const emptyResult = truncateMetadataValue(emptyValue);
console.log(`Test 4 - Null value: Original: ${emptyValue}, Result: "${emptyResult}", Pass: emptyResult === ''`);

// Test 5: Special case with the reported "Happy Orbit Day Earthling" message
const birthdayMessage = `Happy Orbit Day Earthling,👽🚀

Our deep range bio scanners indicate you have completed another orbital period. A cause for celebration! However, scans also detect your system is combating a minor terrestrial microbe (what you call a "cold"). Fascinating, yet inconvenient. What happened to that cuddling human of yours? 
Welcome to Mars, we do not have those biological annoyances here. I recommend prolonged stasis. May your recovery be swift and your next rotation around the sun be free of atmospheric contagions.

Transmitting healing frequencies
`;
const birthdayTruncated = truncateMetadataValue(birthdayMessage);
console.log(`Test 5 - Birthday message: Original length: ${birthdayMessage.length}, Truncated length: ${birthdayTruncated.length}, Pass: ${birthdayTruncated.length <= 500}`);

console.log('All tests completed!');