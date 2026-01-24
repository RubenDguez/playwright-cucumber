import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

const tempDir = path.join(process.cwd(), 'temp');

BeforeAll(async function () {
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
});

AfterAll(async function () {
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
});
