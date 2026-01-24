import { Page, Locator, expect } from '@playwright/test';

/**
 * TodoPage - Page Object Model for TodoMVC Application
 * Implements the sacred POM architecture pattern for test automation
 * Base URL: https://demo.playwright.dev/todomvc
 */
export default class TodoPage {
  constructor(private readonly page: Page) {}

  // Locators - Centralized element selectors via getters
  private get todoInput(): Locator {
    return this.page.getByPlaceholder('What needs to be done?');
  }

  private get todoList(): Locator {
    return this.page.locator('.todo-list');
  }

  private get todoItems(): Locator {
    return this.page.locator('.todo-list li');
  }

  /**
   * Navigate to the TodoMVC application
   */
  async navigate(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/todomvc');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get the page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Assert the page title contains expected text
   */
  async assertPageTitleContains(expectedText: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(expectedText));
  }

  /**
   * Check if the todo input field is visible
   */
  async isTodoInputVisible(): Promise<boolean> {
    return await this.todoInput.isVisible();
  }

  /**
   * Assert the todo input field is visible
   */
  async assertTodoInputVisible(): Promise<void> {
    await expect(this.todoInput).toBeVisible();
  }

  /**
   * Check if the todo input field is enabled
   */
  async isTodoInputEnabled(): Promise<boolean> {
    return await this.todoInput.isEnabled();
  }

  /**
   * Assert the todo input field is enabled
   */
  async assertTodoInputEnabled(): Promise<void> {
    await expect(this.todoInput).toBeEnabled();
  }

  /**
   * Create a new todo item by entering text and pressing Enter
   * @param todoText - The text for the new todo item
   */
  async createTodo(todoText: string): Promise<void> {
    await this.todoInput.fill(todoText);
    await this.todoInput.press('Enter');
  }

  /**
   * Get a specific todo item locator by its text
   * @param todoText - The text of the todo item to find
   */
  private getTodoItemByText(todoText: string): Locator {
    return this.todoItems.filter({ hasText: todoText });
  }

  /**
   * Assert a todo item exists in the list with exact text match
   * @param todoText - The expected todo text
   */
  async assertTodoExists(todoText: string): Promise<void> {
    const todoItem = this.getTodoItemByText(todoText);
    await expect(todoItem).toBeVisible();
    await expect(todoItem.locator('label')).toHaveText(todoText);
  }

  /**
   * Assert a todo item is in active (not completed) state
   * @param todoText - The todo text to verify
   */
  async assertTodoIsActive(todoText: string): Promise<void> {
    const todoItem = this.getTodoItemByText(todoText);
    await expect(todoItem).not.toHaveClass(/completed/);
  }

  /**
   * Mark a todo item as completed by clicking its toggle checkbox
   * @param todoText - The text of the todo item to complete
   */
  async markTodoAsCompleted(todoText: string): Promise<void> {
    const todoItem = this.getTodoItemByText(todoText);
    const toggleCheckbox = todoItem.getByRole('checkbox');
    await toggleCheckbox.check();
  }

  /**
   * Assert a todo item is marked as completed
   * @param todoText - The todo text to verify
   */
  async assertTodoIsCompleted(todoText: string): Promise<void> {
    const todoItem = this.getTodoItemByText(todoText);
    await expect(todoItem).toHaveClass(/completed/);
  }

  /**
   * Assert the completed state is reflected in the DOM via CSS class
   * @param todoText - The todo text to verify
   */
  async assertCompletedStateInDOM(todoText: string): Promise<void> {
    const todoItem = this.getTodoItemByText(todoText);
    // Verify the completed class is present in the DOM
    await expect(todoItem).toHaveClass(/completed/);
    // Verify the checkbox is checked
    const toggleCheckbox = todoItem.getByRole('checkbox');
    await expect(toggleCheckbox).toBeChecked();
  }

  /**
   * Delete a todo item by hovering to reveal the destroy button and clicking it
   * @param todoText - The text of the todo item to delete
   */
  async deleteTodo(todoText: string): Promise<void> {
    const todoItem = this.getTodoItemByText(todoText);
    // Hover over the todo item to reveal the delete button
    await todoItem.hover();
    // Click the destroy button
    const destroyButton = todoItem.locator('button.destroy');
    await destroyButton.click();
  }

  /**
   * Assert a todo item does not exist in the list
   * @param todoText - The todo text that should not exist
   */
  async assertTodoNotExists(todoText: string): Promise<void> {
    const todoItem = this.getTodoItemByText(todoText);
    await expect(todoItem).toHaveCount(0);
  }

  /**
   * Get the count of todo items in the list
   */
  async getTodoCount(): Promise<number> {
    return await this.todoItems.count();
  }

  /**
   * Assert no orphaned UI elements remain after deletion
   * This verifies the todo list is in a clean state
   */
  async assertNoOrphanedElements(): Promise<void> {
    // Verify no empty list items exist
    const emptyItems = this.page.locator('.todo-list li:empty');
    await expect(emptyItems).toHaveCount(0);

    // Verify no detached destroy buttons exist outside of list items
    const orphanedDestroyButtons = this.page.locator('button.destroy:not(.todo-list li button.destroy)');
    await expect(orphanedDestroyButtons).toHaveCount(0);
  }
}
