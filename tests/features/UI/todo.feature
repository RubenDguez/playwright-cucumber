@allure.label.epic:WebInterface
@allure.label.feature:EssentialFeatures
@allure.label.story:Authentication

@allure.label.parentSuite:UI
@allure.label.suite:TodoMVC

@todo @poc @ui
Feature: TodoMVC Basic User Workflows
  As a user of the TodoMVC application
  I want to manage my todo items
  So that I can track my tasks effectively

  Background:
    Given the user navigates to the TodoMVC application

  @smoke @AC-01
  @allure.label.subSuite:PageLoad
  Scenario: Page loads correctly
    Then the page title should contain "TodoMVC"
    And the todo input field should be visible
    And the todo input field should be enabled

  @smoke @AC-02
  @allure.label.subSuite:Create
  Scenario Outline: User creates a new todo with title "<title>"
    When the user creates a todo with text "<title>"
    Then the todo "<title>" should appear in the list
    And the todo "<title>" should be in active state

    Examples:
      | title         |
      | Buy groceries |
      | Walk the dog  |
      | Read a book   |

  @smoke @AC-03
  @allure.label.subSuite:Update
  Scenario: User completes a todo
    When the user creates a todo with text "Complete project report"
    And the user marks the todo "Complete project report" as completed
    Then the todo "Complete project report" should be marked as completed
    And the completed state should be reflected in the DOM

  @smoke @AC-04
  @allure.label.subSuite:Delete
  Scenario: User deletes a todo
    When the user creates a todo with text "Delete me"
    And the user deletes the todo "Delete me"
    Then the todo "Delete me" should not be in the list
    And no orphaned UI elements should remain
