import { parseScript } from 'esprima';

interface Issue {
    message: string;
    line: number | undefined;
}

function analyzeDesign(code: string): Issue[] {
    const issues: Issue[] = [];
    const ast = parseScript(code, { comment: true });

    // Iterate over each node in the AST
    ast.body.forEach((node) => {
        if (node.type === 'VariableDeclaration' && node.kind === 'var') {
            issues.push({
                message: 'Avoid using var for variable declaration, use let or const instead',
                line: node.loc?.start.line,
            });
        }
    });

    return issues;
}

export { analyzeDesign };
