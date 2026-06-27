# Maintaining Guide for hardlogger

This guide explains how to maintain, update, and release new versions of the hardlogger package.

## Table of Contents
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Version Management](#version-management)
- [Release Process](#release-process)
- [Testing](#testing)
- [Common Tasks](#common-tasks)

---

## Development Setup

### Prerequisites
- Node.js >= 14.0.0
- Bun >= 1.0.0 (recommended)
- npm account with publish access
- Git installed

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/rudranboitei/hardlogger.git
cd hardlogger

# Install dependencies
bun install

# Build the project
bun run build

# Watch mode for development
bun run dev
```

---

## Project Structure

```
hardlogger/
├── src/                    # TypeScript source files
│   ├── index.ts           # Main entry point & exports
│   ├── logger.ts          # Core logging implementation
│   ├── env.ts             # Environment detection utilities
│   └── types.ts           # TypeScript type definitions
├── dist/                  # Compiled JavaScript (generated)
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript configuration
├── README.md              # User documentation
├── CHANGELOG.md           # Version history
├── MAINTAINING.md         # This file
├── CONTRIBUTING.md        # Contribution guidelines
├── LICENSE                # MIT License
├── .gitignore            # Git ignore rules
└── .npmignore            # NPM publish ignore rules
```

### Key Files

- **src/index.ts**: Main API surface - keep this minimal and clean
- **src/logger.ts**: Core implementation - all logging logic
- **src/env.ts**: Environment detection - must be robust and safe
- **src/types.ts**: TypeScript definitions - export all public types

---

## Making Changes

### 1. Adding a New Feature

**Example: Adding a `log.debug()` method**

```typescript
// Step 1: Add to types.ts if needed
export type LogLevel = 'success' | 'error' | 'warn' | 'info' | 'debug';

// Step 2: Update LOG_CONFIG in logger.ts
const LOG_CONFIG = {
  // ... existing
  debug: { symbol: '🐛', label: 'DEBUG', color: ANSI_COLORS.gray },
} as const;

// Step 3: Add browser style in logger.ts
const BROWSER_STYLES = {
  // ... existing
  debug: 'background: #6b7280; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
} as const;

// Step 4: Add method to Logger class
public debug(message: string): void {
  this.log('debug', message);
}

// Step 5: Export in index.ts
const log = {
  // ... existing
  debug: (message: string) => logger.debug(message),
};
```

### 2. Modifying Behavior

**Rules to follow:**
- Never break existing API
- Always maintain backward compatibility
- Add deprecation warnings before removing features
- Test in both Node.js and Browser
- Ensure production safety

### 3. Performance Improvements

- Profile before optimizing
- Keep try-catch blocks minimal
- Avoid heavy computations in hot paths
- Test with large message volumes

---

## Version Management

We follow [Semantic Versioning](https://semver.org/):

### Version Format: MAJOR.MINOR.PATCH

- **MAJOR**: Breaking changes (1.0.0 → 2.0.0)
- **MINOR**: New features, backward compatible (1.0.0 → 1.1.0)
- **PATCH**: Bug fixes, backward compatible (1.0.0 → 1.0.1)

### Examples

```bash
# Patch release (bug fixes)
# 0.1.0 → 0.1.1
npm version patch

# Minor release (new features)
# 0.1.0 → 0.2.0
npm version minor

# Major release (breaking changes)
# 0.1.0 → 1.0.0
npm version major
```

### Version Checklist

Before bumping version:
- [ ] All changes documented in CHANGELOG.md
- [ ] Tests pass (if any)
- [ ] Build succeeds without errors
- [ ] README updated if API changed
- [ ] Breaking changes clearly documented

---

## Release Process

### Complete Release Workflow

#### 1. Prepare the Release

```bash
# Ensure you're on main branch and up to date
git checkout main
git pull origin main

# Make sure build is clean
rm -rf dist/
bun run build

# Verify no errors
ls -la dist/
```

#### 2. Update CHANGELOG.md

Add new version section at the top:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New feature description

### Changed
- Modified behavior description

### Fixed
- Bug fix description

### Breaking Changes (if major version)
- Breaking change description
```

#### 3. Update Version

```bash
# Choose one based on changes
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0

# This automatically:
# - Updates package.json version
# - Creates a git commit
# - Creates a git tag
```

#### 4. Review Changes

```bash
# Check the version was updated
cat package.json | grep version

# Check git status
git log -1
git tag
```

#### 5. Build for Production

```bash
# Clean build
rm -rf dist/
bun run build

# Verify output
ls -la dist/

# Check compiled files
cat dist/index.js
```

#### 6. Test Package Locally (Optional but Recommended)

```bash
# Create a test directory
mkdir -p /tmp/hardlogger-test
cd /tmp/hardlogger-test

# Initialize test project
bun init -y

# Install local package
bun add /path/to/hardlogger

# Test it
echo 'import log from "hardlogger"; log.success("Test");' > test.js
bun test.js
```

#### 7. Publish to NPM

```bash
# Login to npm (first time only)
npm login

# Dry run to see what will be published
npm publish --dry-run

# Review files that will be published
# Should only include: dist/, README.md, LICENSE, package.json

# Publish to npm
npm publish

# For first publish, you might need:
npm publish --access public
```

#### 8. Push to GitHub

```bash
# Push commit and tags
git push origin main
git push origin --tags
```

#### 9. Create GitHub Release

1. Go to https://github.com/rudranboitei/hardlogger/releases
2. Click "Draft a new release"
3. Select the version tag
4. Title: `v0.1.0` (or current version)
5. Description: Copy from CHANGELOG.md
6. Publish release

---

## Testing

The project contains a test suite in the `tests/` directory written in TypeScript.

### Manual Test Suite

You can run the full test suite with:

```bash
# Runs both manual and multiple arguments tests
bun run manual:test
```

Alternatively, you can run the test files individually:

```bash
# Run core logging functionality test
bun tests/manual.test.ts

# Run multiple arguments test
bun tests/multiple-args.test.ts
```

### Browser Testing

To test in browser environments, create a local HTML file (e.g., `test-browser.html` in the root directory):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>hardlogger Browser Test</title>
</head>
<body>
    <h1>Check Browser Developer Console (F12)</h1>
    <script type="module">
        import log from './dist/index.js';
        
        log.success('Browser success test');
        log.error('Browser error test');
        log.warn('Browser warning test');
        log.info('Browser info test');
        log.info('Multiple arguments support test:', { user: 'rudranboitei', active: true });
    </script>
</body>
</html>
```

Open the file in any modern web browser and inspect the developer tools console.

---

## Common Tasks

### Adding a New Configuration Option

1. Update `LoggerConfig` interface in `types.ts`
2. Add default value in `Logger` constructor
3. Handle in `configure()` method
4. Document in README.md
5. Add example usage
6. Update CHANGELOG.md

### Improving Error Handling

- Wrap new code in try-catch
- Never throw errors to user
- Log to console.error in dev if needed (rarely)
- Test with invalid inputs

### Optimizing Performance

```bash
# Profile TypeScript compilation
tsc --diagnostics

# Check bundle size
ls -lh dist/
```

### Updating Dependencies

```bash
# Check outdated packages
bun outdated

# Update TypeScript
bun add -d typescript@latest

# Update types
bun add -d @types/node@latest

# Rebuild and test
bun run build
```

---

## Important Reminders

### DO's ✅
- Always build before publishing
- Update CHANGELOG.md for every release
- Test in both Node.js and Browser
- Keep backward compatibility
- Use semantic versioning correctly
- Add JSDoc comments to public APIs
- Keep dependencies minimal

### DON'Ts ❌
- Don't publish without building
- Don't break existing APIs without major version bump
- Don't add runtime dependencies (keep it zero-dependency)
- Don't remove features without deprecation period
- Don't skip version in CHANGELOG.md
- Don't forget to push git tags

---

## Emergency Procedures

### Unpublishing a Broken Release

```bash
# Unpublish within 72 hours (npm policy)
npm unpublish hardlogger@1.2.0

# Or deprecate instead (preferred)
npm deprecate hardlogger@1.2.0 "Broken release, use 1.2.1 instead"

# Fix issue and publish new version
npm version patch
npm publish
```

### Rolling Back

```bash
# Tag previous version as latest
npm dist-tag add hardlogger@1.1.1 latest

# Fix and release new version
npm version patch
npm publish
```

---

## Support and Questions

- GitHub Issues: https://github.com/rudranboitei/hardlogger/issues
- GitHub Discussions: https://github.com/rudranboitei/hardlogger/discussions
- Email: [Your Email]

---

## Checklist for Each Release

```markdown
## Pre-Release
- [ ] All changes tested locally
- [ ] CHANGELOG.md updated
- [ ] Version bumped correctly
- [ ] README.md updated (if needed)
- [ ] Build succeeds (bun run build)
- [ ] No uncommitted changes

## Release
- [ ] npm publish completed
- [ ] Git tags pushed
- [ ] GitHub release created

## Post-Release
- [ ] Package installable (bun add hardlogger)
- [ ] Verify on npmjs.com
- [ ] Test in fresh project
- [ ] Monitor for issues
```

---

**Last Updated**: January 9, 2026
**Maintainer**: rudranboitei
