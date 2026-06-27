# Contributing to hardlogger

Thank you for considering contributing to hardlogger! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

---

## Code of Conduct

This project follows a simple code of conduct:
- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards other contributors

## How Can I Contribute?

### Reporting Bugs

Before submitting a bug report:
- Check existing issues to avoid duplicates
- Test with the latest version
- Collect information about your environment

**Bug Report Template:**

```markdown
**Description**
Clear description of the bug

**To Reproduce**
Steps to reproduce the behavior:
1. Import hardlogger
2. Call log.success('...')
3. See error

**Expected Behavior**
What you expected to happen

**Environment:**
- Node.js version: [e.g., 18.0.0]
- Bun version: [e.g., 1.0.0]
- Browser: [e.g., Chrome 120]
- hardlogger version: [e.g., 0.1.0]
- OS: [e.g., macOS, Windows, Linux]

**Additional Context**
Any other relevant information
```

### Suggesting Features

Feature requests are welcome! Please provide:
- Clear use case
- Example API you envision
- Why it benefits users
- Whether it's a breaking change

**Feature Request Template:**

```markdown
**Problem Statement**
What problem does this solve?

**Proposed Solution**
How would you implement this?

**Example Usage**
```typescript
import log from 'hardlogger';
log.newFeature('example');
```

**Alternatives Considered**
Other approaches you've thought about
```

### Contributing Code

We love pull requests! Here's how to contribute:

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/hardlogger.git
cd hardlogger
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 4. Make Your Changes

- Edit files in `src/` directory
- Follow existing code style
- Add comments for complex logic
- Keep changes focused and minimal

### 5. Build and Test

```bash
# Build TypeScript
bun run build

# Check for errors
ls -la dist/

# Manual test
bun run manual:test
```

### 6. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature"
```

---

## Pull Request Process

### Before Submitting

- [ ] Code builds without errors
- [ ] Follows project coding standards
- [ ] No console.log or debug code left
- [ ] README updated (if needed)
- [ ] CHANGELOG.md updated

### Submitting PR

1. Push to your fork
```bash
git push origin feature/your-feature-name
```

2. Open PR on GitHub
3. Fill out the PR template
4. Link related issues

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test this?

## Checklist
- [ ] Code follows project style
- [ ] Built successfully
- [ ] Updated documentation
- [ ] Updated CHANGELOG.md
```

### Review Process

- Maintainer will review within a few days
- Address feedback promptly
- Keep PR focused on one thing
- Be open to suggestions

---

## Coding Standards

### TypeScript Style

```typescript
// ✅ Good: Clear, typed, documented
/**
 * Log a success message
 * @param message - The message to log
 */
public success(message: string): void {
  this.log('success', message);
}

// ❌ Bad: No types, no comments
function doSomething(x) {
  // ...
}
```

### Naming Conventions

- **Variables/Functions**: camelCase
  ```typescript
  const logMessage = 'test';
  function formatOutput() {}
  ```

- **Classes**: PascalCase
  ```typescript
  class Logger {}
  ```

- **Constants**: UPPER_CASE
  ```typescript
  const ANSI_COLORS = { ... };
  ```

- **Types/Interfaces**: PascalCase
  ```typescript
  interface LoggerConfig {}
  type RuntimeEnvironment = 'node' | 'browser';
  ```

### Error Handling

Always wrap in try-catch:

```typescript
// ✅ Good: Safe, never throws
public success(message: string): void {
  try {
    this.log('success', message);
  } catch {
    // Fail silently - never break user's app
  }
}

// ❌ Bad: Can throw errors
public success(message: string): void {
  this.log('success', message); // Might throw!
}
```

### Comments

```typescript
// ✅ Good: Explains WHY
// Disable logging in production to avoid performance overhead
if (!this.config.enabled) return;

// ❌ Bad: Explains WHAT (obvious from code)
// Check if config enabled is false
if (!this.config.enabled) return;
```

### File Organization

Each file should have a clear purpose:

```typescript
// 1. Imports
import { something } from './module';

// 2. Type definitions
type MyType = string;

// 3. Constants
const CONSTANT = 'value';

// 4. Implementation
class MyClass {
  // ...
}

// 5. Exports
export default MyClass;
```

---

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Code style (formatting, semicolons)
- **refactor**: Code restructuring
- **perf**: Performance improvement
- **test**: Adding tests
- **chore**: Build process, tooling

### Examples

```bash
# Feature
feat(logger): add debug log level

# Bug fix
fix(env): handle undefined process in edge runtimes

# Documentation
docs(readme): add browser usage example

# Breaking change
feat(api)!: remove deprecated methods

BREAKING CHANGE: removed log.verbose() method
```

### Good Commit Messages

```bash
✅ feat: add timestamp configuration option
✅ fix: prevent crash when window is undefined
✅ docs: update installation instructions
✅ refactor: simplify environment detection logic
```

### Bad Commit Messages

```bash
❌ updated code
❌ fix bug
❌ changes
❌ WIP
```

---

## Testing Guidelines

### Manual Testing

Test both environments:

```bash
# Node.js
bun run manual:test

# Browser
# Open test-browser.html in browser
```

### Edge Cases to Test

- [ ] Production mode (NODE_ENV=production)
- [ ] Browser without window.document
- [ ] Node.js without process.env
- [ ] Invalid input types
- [ ] Very long messages
- [ ] Special characters
- [ ] Empty strings
- [ ] null/undefined values

---

## Documentation

### When to Update README

- New feature added
- API changed
- New example needed
- Installation process changed

### Documentation Style

```markdown
<!-- ✅ Good: Clear, with example -->
### log.success(message)

Log a success message with green styling.

**Example:**
```typescript
log.success('Server started successfully');
```

<!-- ❌ Bad: Vague, no example -->
### success
Logs stuff
```

---

## Performance Considerations

- Avoid synchronous blocking operations
- Minimize string operations
- Cache computed values
- Keep hot paths optimized
- Profile before optimizing

---

## Questions?

- Open an issue for discussion
- Check existing issues and PRs
- Read MAINTAINING.md for detailed info

---

Thank you for contributing to hardlogger! 🎉
