import { parseScript } from 'esprima';

interface Issue {
    message: string;
    line: number | undefined;
}

function cyclomaticComplexity(node: any): number {
    let complexity = 0;

    switch (node.type) {
        case 'IfStatement':
        case 'WhileStatement':
        case 'DoWhileStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'ForOfStatement':
        case 'ConditionalExpression':
            complexity++;
            break;

        case 'SwitchCase':
            if (node.test) complexity++;  // ignore default case
            break;

        default:
            break;
    }

    for (let childNode in node) {
        if (node[childNode] && typeof node[childNode] === 'object') {
            complexity += cyclomaticComplexity(node[childNode]);
        }
    }

    return complexity;
}

function analyzeComplexity(code: string): Issue[] {
    const ast = parseScript(code);
    const issues: Issue[] = [];

    ast.body.forEach((node: any) => {
        if (node.type === 'FunctionDeclaration' || node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression') {
            const complexity = cyclomaticComplexity(node);
            if (complexity > 10) {
                issues.push({
                    message: 'Function has high cyclomatic complexity: ' + complexity,
                    line: node.loc?.start.line,
                });
            }
        }
    });

    return issues;
}

export { analyzeComplexity };
