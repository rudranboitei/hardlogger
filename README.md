# hardlogger

[![npm version](https://img.shields.io/npm/v/hardlogger.svg)](https://www.npmjs.com/package/hardlogger)
[![npm downloads](https://img.shields.io/npm/dm/hardlogger.svg)](https://www.npmjs.com/package/hardlogger)
[![license](https://img.shields.io/npm/l/hardlogger.svg)](https://github.com/rudranboitei/hardlogger/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Beautiful, colorful dev-only logging for Node.js and Browser with **zero configuration**.

Automatically detects your runtime environment and applies appropriate styling:
- 🎨 **Node.js**: ANSI colors in terminal
- 🌐 **Browser**: CSS-styled console messages
- 🔒 **Production-safe**: Automatically disabled in production
- 🚀 **Zero dependencies**: No external libraries needed

## Installation

```bash
bun add hardlogger
```

```bash
npm install hardlogger
```

```bash
yarn add hardlogger
```

```bash
pnpm add hardlogger
```

## Basic Usage

```typescript
import log from 'hardlogger';

log.success('Server started successfully!');
log.error('Database connection failed');
log.warn('Missing environment variable');
log.info('Listening on port 3000');
```

### Named Exports (ES Modules)

In addition to the default export, `hardlogger` also supports named exports for better tree-shaking and cleaner ES Modules integration:

```typescript
import { success, error, warn, info } from 'hardlogger';

success('Server started successfully!');
error('Database connection failed');
```

### Output in Node.js Terminal
```
✔ SUCCESS    Server started successfully!
✖ ERROR      Database connection failed
⚠ WARNING    Missing environment variable
ℹ INFO       Listening on port 3000
```

## 🧪 Before vs After

### 🖥️ Backend (Node.js / Express)

**After**
<img width="1536" height="1024" alt="ChatGPT Image Jun 27, 2026, 10_31_41 AM" src="https://github.com/user-attachments/assets/c575ffe3-b6e0-4998-bcc0-fc636e0f55c6" />




### 🌐 Frontend (React / Next.js)

<img width="1536" height="1024" alt="ChatGPT Image Jun 27, 2026, 10_31_48 AM" src="https://github.com/user-attachments/assets/fa08fe7a-add1-48c8-ab9b-6807dc5baf95" />




## Examples

### Node.js / Express

```typescript
import express from 'express';
import log from 'hardlogger';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  log.info(`${req.method} ${req.path}`);
  res.send('Hello World!');
});

app.listen(PORT, () => {
  log.success(`Server running on http://localhost:${PORT}`);
});
```

### Next.js - App Router (Server Component)

```typescript
// app/page.tsx
import log from 'hardlogger';

export default async function HomePage() {
  // This runs on the server
  log.info('Rendering home page');
  
  const data = await fetchData();
  log.success('Data fetched successfully');
  
  return <div>{data.title}</div>;
}
```

### Next.js - App Router (Client Component)

```typescript
'use client';

import { useEffect } from 'react';
import log from 'hardlogger';

export default function ClientComponent() {
  useEffect(() => {
    // This runs in the browser
    log.success('Client component mounted');
    
    return () => {
      log.info('Client component unmounted');
    };
  }, []);
  
  const handleClick = () => {
    log.info('Button clicked');
  };
  
  return <button onClick={handleClick}>Click me</button>;
}
```

### Next.js - Pages Router

```typescript
// pages/index.tsx
import { GetServerSideProps } from 'next';
import log from 'hardlogger';

export const getServerSideProps: GetServerSideProps = async () => {
  log.info('Fetching data for page');
  
  const data = await fetchData();
  log.success('Data loaded');
  
  return { props: { data } };
};

export default function Page({ data }) {
  return <div>{data.title}</div>;
}
```

### Browser-Only App

```typescript
import log from 'hardlogger';

document.addEventListener('DOMContentLoaded', () => {
  log.success('DOM loaded');
  
  const button = document.querySelector('#myButton');
  button?.addEventListener('click', () => {
    log.info('Button clicked');
  });
});
```

## API Reference

### `log.success(message: string): void`
Log a success message with green styling.

```typescript
log.success('Operation completed successfully');
```

### `log.error(message: string): void`
Log an error message with red styling.

```typescript
log.error('Failed to connect to database');
```

### `log.warn(message: string): void`
Log a warning message with yellow/orange styling.

```typescript
log.warn('API key is missing');
```

### `log.info(message: string): void`
Log an info message with blue styling.

```typescript
log.info('Server is starting...');
```

### `log.config(options: LoggerConfig): typeof log`
Configure logger options. Returns the log object for chaining.

```typescript
log.config({ 
  enabled: true, 
  showTimestamp: true 
});
```

#### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` in dev, `false` in production | Enable or disable logging |
| `showTimestamp` | `boolean` | `false` | Show timestamp in log messages |

### Configuration Examples

#### Enable timestamps

```typescript
import log from 'hardlogger';

log.config({ showTimestamp: true });

log.info('Server started');
// Output: ℹ INFO  [10:30:45 AM] Server started
```

#### Force enable in production (NOT RECOMMENDED)

```typescript
import log from 'hardlogger';

// ⚠️ Only do this if you understand the implications
log.config({ enabled: true });
```

#### Chain configuration

```typescript
import log from 'hardlogger';

log
  .config({ showTimestamp: true })
  .success('Configured and ready!');
```

## ⚠️ Dev-Only Warning

**This package is designed for development use only.**

By default, all logging is **automatically disabled** when `NODE_ENV === 'production'`.

This ensures:
- No performance overhead in production
- No sensitive information leaks
- Clean production logs
- Zero impact on bundle size behavior

### How it works

```typescript
// Automatically disabled in production
process.env.NODE_ENV = 'production';

log.info('This will NOT appear'); // Silent in production
```

To explicitly enable in production (not recommended):

```typescript
log.config({ enabled: true });
```

## Features

✅ **Zero Configuration** - Works immediately after install  
✅ **Environment Detection** - Auto-detects Node.js vs Browser  
✅ **Production Safe** - Disabled by default in production  
✅ **TypeScript Support** - Full type definitions included  
✅ **Zero Dependencies** - No external packages  
✅ **Lightweight** - Minimal footprint  
✅ **SSR Compatible** - Works with Next.js, Remix, etc.  
✅ **Edge Runtime Safe** - Won't crash in Vercel, Cloudflare Workers  
✅ **Never Throws** - Fails silently, never breaks your app  

## Requirements

- Node.js >= 14.0.0
- Bun >= 1.0.0
- Modern browser with console support

## TypeScript

This package is written in TypeScript and ships with type definitions.

```typescript
import log, { LoggerConfig } from 'hardlogger';

const config: LoggerConfig = {
  enabled: true,
  showTimestamp: false,
};

log.config(config);
```

## Browser Support

Works in all modern browsers that support:
- `console.log` with CSS styling (`%c`)
- ES2018 features

Tested in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Node.js Support

Works in:
- Bun (recommended)
- Node.js 14+
- Deno (with npm compatibility)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © rudranboitei

## Related Projects

- [chalk](https://github.com/chalk/chalk) - Terminal string styling
- [consola](https://github.com/unjs/consola) - Elegant Console Logger
- [pino](https://github.com/pinojs/pino) - Super fast logger

## Why Another Logger?

Most logging libraries are either:
- Too heavy (large dependencies)
- Node.js only
- Browser only
- Require configuration
- Not production-safe by default

`hardlogger` is designed specifically for the **developer experience** during development, with:
- Automatic environment detection
- Zero configuration
- Production safety built-in
- Works everywhere (Node + Browser)

Perfect for quick debugging, prototyping, and development workflows.
