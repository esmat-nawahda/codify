import chokidar from 'chokidar';
import fs from 'fs';
import { analyzeComments, analyzeComplexity, analyzeDesign, analyzeDuplication, analyzeRefactoring } from './analyzers';

function watchAndAnalyze(directory: string, extension: string) {
    const watcher = chokidar.watch(directory, { ignored: /^\./, persistent: true });

    watcher.on('change', (path: any) => {
        if (path.endsWith(extension)) {
            const code = fs.readFileSync(path, 'utf-8');


            // collect issues
            const commentsIssues = analyzeComments(code);
            const designIssues = analyzeDesign(code);
            const complexityIssues = analyzeComplexity(code);
            const duplicationIssues = analyzeDuplication(code);
            const refactoringIssues = analyzeRefactoring(code);

            console.warn(`Comments in ${path}:`, commentsIssues);
            console.warn(`Design in ${path}:`, designIssues);
            console.warn(`Complexity in ${path}:`, complexityIssues);
            console.warn(`Duplication in ${path}:`, duplicationIssues);
            console.warn(`Refactoring in ${path}:`, refactoringIssues);
        }
    });
}

export { watchAndAnalyze };