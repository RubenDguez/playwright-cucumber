import { Before } from '@cucumber/cucumber';
import { Fixture } from '@fixtures/world';
import TodoPage from '@pages/TodoPage';

Before({ name: 'PageLoader Before' }, async function (this: Fixture) {
  this.todoPage = new TodoPage(this.page);
});
