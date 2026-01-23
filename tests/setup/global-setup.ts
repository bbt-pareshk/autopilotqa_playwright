import fs from 'fs';
import path from 'path';

export default async () => {
  const resultsDir = path.resolve('allure-results');

  // ✅ Ensure directory exists
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const env = `
ENV=${process.env.ENV ?? 'staging'}
BASE_URL=${process.env.BASE_URL ?? 'https://www.treebet365.com'}
CI=${process.env.CI ?? 'false'}
BRANCH=${process.env.GIT_BRANCH ?? 'local'}
COMMIT=${process.env.GIT_COMMIT ?? 'local'}
`.trim();

  fs.writeFileSync(
    path.join(resultsDir, 'environment.properties'),
    env
  );
};
