import { Before } from '@cucumber/cucumber';
import { Fixture } from '@fixtures/world';
import TodoPage from '@pages/TodoPage';

Before(async function (this: Fixture) {
  this.todoPage = new TodoPage(this.page);
});
