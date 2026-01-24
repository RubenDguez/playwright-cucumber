import { IWorldOptions, setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext, APIResponse, Browser, BrowserContext, Page } from '@playwright/test';
import Logger from '@argenis.dominguez/logger';
import TodoPage from '@pages/TodoPage';

export class Fixture extends World {
  // Playwright objects
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Page Objects
  todoPage!: TodoPage;

  // API Request Context
  request!: APIRequestContext;
  response!: APIResponse;

  // Logger
  logger!: ReturnType<typeof Logger>;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setDefaultTimeout(120000);
setWorldConstructor(Fixture);
