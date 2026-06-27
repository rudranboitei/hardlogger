# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-06-27

### Added
- Named ESM exports for logging methods (`success`, `error`, `warn`, `info`, `config`) supporting cleaner modern import workflows.
- Dedicated `Hardlogger` public TypeScript interface to resolve circular type definitions.
- Modern package exports mapping in `package.json` for precise ESM bundler and runtime resolution.
- Production environment detection support for Vite, Bun, and modern ESM bundlers using `import.meta.env.PROD`.
- Added keywords `"react"`, `"vite"`, `"developer"`, `"developer-tools"`, `"terminal-logger"`.

### Changed
- Improved type safety by changing log method signatures from `any[]` to `unknown[]`.
- Refactored environment checks to natively support ES module packages with `"type": "module"` configurations.
- Map severities directly to native browser/Node streams (`console.error` for errors, `console.warn` for warnings, `console.info` for info logs, and `console.log` for success outputs) to support standard stderr/stdout pipelines and log aggregators.
- Updated `engines.node` requirements to `node >=16.0.0` for ES Modules native robustness.
- Migrated manual testing playground scripts to `tests/` directory as TypeScript files.
- Simplified runtime environment check logic to remain lightweight, clean, and dependency-free.
- Changed author and organization URLs to `rudranboitei`.

## [1.1.1] - 2026-01-11

### Changed
- Revised logging demonstration images/GIFs in `README.md`.
- Bumped package version to 1.1.1.

## [1.1.0] - 2026-01-11

### Added
- Multiple arguments support to all logging methods (`success`, `error`, `warn`, `info`), allowing logging of objects, arrays, errors, mixed types, and multiple values similarly to standard `console.log`.
- Manual test script `test-multiple-args.js` to verify multi-argument support.

### Changed
- Enhanced `README.md` with before/after logging examples and updated usage guides for multi-argument logging.

## [1.0.1] - 2026-01-11

### Changed
- Bumped package version to 1.0.1 and updated repository links.

## [1.0.0] - 2026-01-11

### Changed
- **BREAKING**: Migrated from scoped package `@rdrudra99/hardlog` to unscoped `hardlogger`
- Package name changed for better discoverability and professional branding
- Bumped to v1.0.0 to signal production-ready status
- Enhanced npm keywords for better search visibility

### Migration
To upgrade from `@rdrudra99/hardlog`, simply:
```bash
npm uninstall @rdrudra99/hardlog && npm install hardlogger
```
Then update your imports from `'@rdrudra99/hardlog'` to `'hardlogger'`. The API is 100% identical.

### Note
The old scoped package `@rdrudra99/hardlog` will remain available but deprecated. All future updates will be published to `hardlogger`.

---

## [0.1.0] - 2026-01-09

### Added
- Initial release of hardlog
- Auto-detection for Node.js and Browser environments
- ANSI color support for terminal output
- CSS-styled console output for browsers
- Production-safe logging (disabled by default in production)
- Configuration API with `log.config()`
- TypeScript support with full type definitions
- Zero dependencies (only dev dependencies)
- Four log levels: success, error, warn, info
- Optional timestamp support

### Features
- Works in Node.js 14+
- Works in all modern browsers
- Compatible with Next.js (App Router + Pages Router)
- Compatible with Express.js
- Compatible with Bun and Deno
- SSR-safe and edge runtime compatible
- Never throws errors - fails silently
