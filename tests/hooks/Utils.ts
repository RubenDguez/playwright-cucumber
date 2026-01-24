import { Before } from '@cucumber/cucumber';
import { Fixture } from '@fixtures/world';
import Logger from '@argenis.dominguez/logger';

Before(async function (this: Fixture) {
  this.logger = Logger('MVC');
});
