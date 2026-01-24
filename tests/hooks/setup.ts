import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

const tempDir = path.join(process.cwd(), 'temp');

BeforeAll({ name: 'Setup BeforeAll' }, async function () {
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
});

AfterAll({ name: 'Setup AfterAll' }, async function () {
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
});
