import { parseScript } from 'esprima';

interface Issue {
    message: string;
    line: number | undefined;
}

function analyzeRefactoring(code: string): Issue[] {
    const ast = parseScript(code);
    const issues: Issue[] = [];

    ast.body.forEach((node: any) => {
        if (node.type === 'FunctionDeclaration') {
            const startLine = node.loc?.start.line;
            const endLine = node.loc?.end.line;

            if (endLine && startLine && (endLine - startLine) > 50) {
                issues.push({
                    message: 'Function is too long and may need refactoring.',
                    line: startLine,
                });
            }
        }
    });

    return issues;
}

export { analyzeRefactoring };
