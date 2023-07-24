import { parseScript } from 'esprima';

interface Issue {
  message: string;
  line: number | undefined;
}

function analyzeComments(code: string): Issue[] {
  const issues: Issue[] = [];
  const ast = parseScript(code, { comment: true });

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

  return issues;
}

export { analyzeComments };
