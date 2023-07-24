import { parseScript } from 'esprima';

interface Issue {
    message: string;
    line: number | undefined;
}

function analyzeDuplication(code: string): Issue[] {
    const ast = parseScript(code);
    const issues: Issue[] = [];
    const functionNames: { [key: string]: number } = {};

    // Traverse the AST
    ast.body.forEach((node: any) => {
        if (node.type === 'FunctionDeclaration') {
            const functionName = node.id.name;
            if (functionNames[functionName]) {
                issues.push({
                    message: `Function "${functionName}" is duplicated.`,
                    line: node.loc?.start.line,
                });
            } else {
                functionNames[functionName] = 1;
            }
        }
    });

    return issues;
}

export { analyzeDuplication };
