import { toCapitalize } from '../utils/toCapitalize';
describe('Tests for function toCapitalize', () => {
  it('should capitalize the first letter of each word in a sentence', () => {
    expect(toCapitalize('hello world')).toBe('Hello World');
  });
  it('should capitalize single words', () => {
    expect(toCapitalize('test')).toBe('Test');
    expect(toCapitalize('')).toBe('');
  });
  it('should capitalize words with multiple spaces', () => {
    expect(toCapitalize('  hello  world  ')).toBe('  Hello  World  ');
  });
});
