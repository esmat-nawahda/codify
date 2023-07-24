# Codify 🚀🎉
"Because there's nothing scarier than your own code!"

Codify is a TypeScript library that helps you analyze your code for readability, maintainability, complexity, and more. It's like a spellchecker for your code, but instead of finding spelling mistakes, it finds coding issues!

## Features 🎁
Design Analyzer: Checks your code for adherence to good design principles.
Complexity Analyzer: Calculates the cyclomatic complexity of your code.
Duplication Analyzer: Finds duplicate code that may have been unintentionally copied.
Refactor Analyzer: Suggests parts of your code that may need refactoring.

## Installation 🚀
Use the package manager npm to install codify.

```bash
npm install codify
```

## Usage 📖
Here's how you use Codify to analyze some TypeScript code:

```javascript
import { analyzeDesign, analyzeComplexity, analyzeDuplication, analyzeRefactoring } from 'codify';

const code = `
  function foo(bar) {
    var a = 'hello world';
    return a + bar;
  }

  function foo(bar) {
    var a = 'hello world';
    return a + bar;
  }
`;

console.log(analyzeDesign(code));
console.log(analyzeComplexity(code));
console.log(analyzeDuplication(code));
console.log(analyzeRefactoring(code));
```

## Keep in Mind 🤔
Codify is not an oracle - it's a tool. It won't write perfect code for you, but it will help you spot potential issues in your code. Remember, the goal is not to achieve zero issues, but to write better, more maintainable code.

## Contribution 🤝
Have a cool idea to make Codify even more awesome? Found a bug? Feel free to open an issue or a pull request!

Let Codify shine a light on your darkest, deepest, most obscure code! Say goodbye to your fear, and say hello to Codify - the friendly code analyzer! 👋🎉

Happy coding! 🎉