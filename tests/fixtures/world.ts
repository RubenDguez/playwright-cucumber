import { IWorldOptions, setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import TodoPage from '@pages/TodoPage';

export class Fixture extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  todoPage!: TodoPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setDefaultTimeout(120000);
setWorldConstructor(Fixture);
