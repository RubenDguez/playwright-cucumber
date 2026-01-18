import { IWorldOptions, setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import HomePage from '@pages/home';

export class Fixture extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  homePage!: HomePage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setDefaultTimeout(120000);
setWorldConstructor(Fixture);
