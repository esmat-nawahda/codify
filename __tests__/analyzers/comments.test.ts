import { analyzeComments } from '../../src/analyzers/comments';

describe('analyzeComments', () => {
  it('should detect functions without comments', () => {
    const code = `
      function add(a, b) {
        return a + b;
      }
      
      // Subtract function
      function subtract(a, b) {
        return a - b;
      }
    `;

    const issues = analyzeComments(code);

    expect(issues).toHaveLength(1);
    expect(issues[0].message).toBe('Function is missing a comment');
    expect(issues[0].line).toBe(2);  // Note: The line number might vary depending on how the code string is formatted
  });
});
