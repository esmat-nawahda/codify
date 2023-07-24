import { parseScript } from 'esprima';
import { Project, SyntaxKind } from 'ts-morph';

interface Issue {
    message: string;
    line: number | undefined;
}

/**
 * Analyze the design of a piece of code.
 * 
 * @param {string} code - The code to analyze
 * @returns {Issue[]} A list of issues found in the code
 */
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

    const project = new Project({
        useInMemoryFileSystem: true,
    });

    const sourceFile = project.createSourceFile('file.ts', code);

    // Analyze large functions
    const functions = sourceFile.getFunctions();
    for (const fn of functions) {
        const lines = fn.getEndLineNumber() - fn.getStartLineNumber();
        if (lines > 50) {
            issues.push({
                message: `The function "${fn.getName()}" is quite long (${lines} lines). Consider breaking it up into smaller functions.`,
                line: fn.getStartLineNumber(),
            });
        }
    }

    // Analyze deeply nested code
    const blocks = sourceFile.getDescendantsOfKind(SyntaxKind.Block);
    for (const block of blocks) {
        const depth = block.getDescendantsOfKind(SyntaxKind.Block).length;
        if (depth > 4) {
            issues.push({
                message: 'This block of code is deeply nested. Consider flattening it for readability.',
                line: block.getStartLineNumber(),
            });
        }
    }

    return issues;
}

export { analyzeDesign };
