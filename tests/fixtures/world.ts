import { IWorldOptions, setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import Logger from '@argenis.dominguez/logger';
import TodoPage from '@pages/TodoPage';

export class Fixture extends World {
  // Playwright objects
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Page Objects
  todoPage!: TodoPage;

  // Logger
  logger!: ReturnType<typeof Logger>;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setDefaultTimeout(120000);
setWorldConstructor(Fixture);
