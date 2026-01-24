import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

BeforeAll(async function () {
  if (!fs.existsSync(path.join(process.cwd(), 'temp'))) {
    fs.mkdirSync(path.join(process.cwd(), 'temp'));
  }
});

AfterAll(async function () {
  if (fs.existsSync(path.join(process.cwd(), 'temp'))) {
    fs.rmSync(path.join(process.cwd(), 'temp'), { recursive: true });
  }
});
