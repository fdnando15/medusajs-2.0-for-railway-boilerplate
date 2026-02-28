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

// NOTE: Subscribers are NOT copied here because `medusa build` already compiles
// them into .medusa/server/. Copying the .ts source files on top would cause
// duplicate subscriber registration errors at runtime (e.g. "Subscriber with id
// user-invite-handler already exists").

// Copy email-notifications module (templates use .tsx/JSX which may not be
// fully compiled by `medusa build`, so we copy the source as a safety measure)
const emailModuleSourcePath = path.join(process.cwd(), 'src', 'modules', 'email-notifications');
const emailModuleDestPath = path.join(MEDUSA_SERVER_PATH, 'src', 'modules', 'email-notifications');
if (fs.existsSync(emailModuleSourcePath)) {
  console.log('Copying email-notifications module to .medusa/server/src/modules/email-notifications...');
  fs.cpSync(emailModuleSourcePath, emailModuleDestPath, { recursive: true });
  console.log('✅ Email-notifications module copied successfully');
} else {
  console.log('⚠️  No email-notifications module found - skipping');
}

// Install dependencies
console.log('Installing dependencies in .medusa/server...');
execSync('pnpm i --prod --frozen-lockfile', { 
  cwd: MEDUSA_SERVER_PATH,
  stdio: 'inherit'
});
