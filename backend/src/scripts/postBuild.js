const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const MEDUSA_SERVER_PATH = path.join(process.cwd(), '.medusa', 'server');

// Check if .medusa/server exists - if not, build process failed
if (!fs.existsSync(MEDUSA_SERVER_PATH)) {
  throw new Error('.medusa/server directory not found. This indicates the Medusa build process failed. Please check for build errors.');
}

// Copy pnpm-lock.yaml
fs.copyFileSync(
  path.join(process.cwd(), 'pnpm-lock.yaml'),
  path.join(MEDUSA_SERVER_PATH, 'pnpm-lock.yaml')
);

// Copy .env if it exists
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  fs.copyFileSync(
    envPath,
    path.join(MEDUSA_SERVER_PATH, '.env')
  );
}

// NOTE: Subscribers and custom modules (including email-notifications with .tsx
// templates) are compiled by `medusa build` into .medusa/server/ automatically.
// Do NOT copy raw .ts/.tsx source files here - it causes conflicts:
// - Subscribers: duplicate registration errors at runtime
// - Modules: compiled .js overwritten by raw .ts, breaking module resolution
//
// IMPORTANT: The email-notifications module uses .tsx templates (react-email).
// The compiled output requires `react` and `react-dom` at runtime (jsx-runtime).
// These MUST be in `dependencies` (not devDependencies) in package.json, because
// the `pnpm i --prod` below only installs production dependencies.

// Install dependencies
console.log('Installing dependencies in .medusa/server...');
execSync('pnpm i --prod --frozen-lockfile', { 
  cwd: MEDUSA_SERVER_PATH,
  stdio: 'inherit'
});
