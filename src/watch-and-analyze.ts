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

            console.warn(`Comments Issues in ${path}:`, commentsIssues);
            console.warn(`Design Issues in ${path}:`, designIssues);
            console.warn(`Complexity Issues in ${path}:`, complexityIssues);
            console.warn(`Duplication Issues in ${path}:`, duplicationIssues);
            console.warn(`Refactoring Issues in ${path}:`, refactoringIssues);
        }
    });
}

export { watchAndAnalyze };