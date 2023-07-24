import { parseScript } from 'esprima';

interface Issue {
  message: string;
  line: number | undefined;
}

/**
 * Analyze the comments in a piece of code.
 * 
 * @param {string} code - The code to analyze
 * @returns {Issue[]} A list of issues found in the code
 */
function analyzeComments(code: string): Issue[] {
  const issues: Issue[] = [];
  const ast = parseScript(code, { comment: true });

  const urlPattern = /https?:\/\/[^\s]+/;
  const profanityList = ['badword1', 'badword2']; // Replace with actual list
  const spellingMistakes = ['teh', 'thsi', 'funciton']; // Simplified example, consider using a spell-check library
  const genericComments = ['fix this', 'this is a hack', 'not sure why this works'];


  // Iterate over each node in the AST
  for (const node of ast.body) {
    if (node.type === 'FunctionDeclaration') {
      // Check if the function has a comment above it
      const hasComment = node.leadingComments && node.leadingComments.length > 0;

      if (!hasComment) {
        issues.push({
          message: 'Function is missing a comment',
          line: node.loc?.start.line,
        });
      }
    }
  }

  ast?.comments?.forEach((comment) => {
    if (comment.value.length > 100) {
      issues.push({
        message: 'This comment is quite long. Consider refactoring the code to make it clearer.',
        line: comment.loc?.start.line,
      });
    }

    if (comment.type === 'Block' && !comment.value.startsWith('*')) {
      issues.push({
        message: 'This block comment is not a JSDoc comment. Consider using JSDoc for better documentation.',
        line: comment.loc?.start.line,
      });
    }

    if (comment.value.includes('TODO')) {
      issues.push({
        message: 'This comment contains a TODO. Don\'t forget to address it!',
        line: comment.loc?.start.line,
      });
    }

    if (comment.value.includes('function') || comment.value.includes('var')) {
        issues.push({
          message: 'This comment contains code. If the code isn\'t needed, consider removing it.',
          line: comment.loc?.start.line,
        });
      }
  
      if (urlPattern.test(comment.value)) {
        issues.push({
          message: 'This comment contains a URL. Consider moving URLs to a configuration file.',
          line: comment.loc?.start.line,
        });
      }
  
      for (const word of profanityList) {
        if (comment.value.includes(word)) {
          issues.push({
            message: `This comment contains inappropriate language: ${word}`,
            line: comment.loc?.start.line,
          });
          break;
        }
      }

      for (const mistake of spellingMistakes) {
        if (comment.value.toLowerCase().includes(mistake)) {
          issues.push({
            message: `This comment contains a potential spelling mistake: "${mistake}"`,
            line: comment.loc?.start.line,
          });
          break;
        }
      }
  
      for (const genericComment of genericComments) {
        if (comment.value.toLowerCase().includes(genericComment)) {
          issues.push({
            message: `This comment is too generic and doesn't provide enough context: "${genericComment}"`,
            line: comment.loc?.start.line,
          });
          break;
        }
      }
  
      // This is a basic check and may result in false positives
      const words = comment.value.split(' ');
      for (const word of words) {
        if (!code.includes(word)) {
          issues.push({
            message: `This comment references "${word}" which does not appear in the code. It might be outdated.`,
            line: comment.loc?.start.line,
          });
          break;
        }
      }
  });


  return issues;
}

export { analyzeComments };
