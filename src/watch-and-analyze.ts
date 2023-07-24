import fs from 'fs';
import { analyzeComments, analyzeComplexity, analyzeDesign, analyzeDuplication, analyzeRefactoring } from './analyzers';

function watchAndAnalyze(directory: string, extension: string) {
    fs.watch(directory, { recursive: true }, (eventType, filename: any) => {
        if (filename.endsWith(extension)) {
            const filePath = `${directory}/${filename}`;
            const code = fs.readFileSync(filePath, 'utf-8');

            // collect issues
            const commentsIssues = analyzeComments(code);
            const designIssues = analyzeDesign(code);
            const complexityIssues = analyzeComplexity(code);
            const duplicationIssues = analyzeDuplication(code);
            const refactoringIssues = analyzeRefactoring(code);

            console.warn(`Comments Issues in ${filename}:`, commentsIssues);
            console.warn(`Design Issues in ${filename}:`, designIssues);
            console.warn(`Complexity Issues in ${filename}:`, complexityIssues);
            console.warn(`Duplication Issues in ${filename}:`, duplicationIssues);
            console.warn(`Refactoring Issues in ${filename}:`, refactoringIssues);
        }
    });
}

export { watchAndAnalyze };