@allure.label.epic:WebInterface
@allure.label.feature:EssentialFeatures
@allure.label.story:Authentication

@allure.label.parentSuite:API
@allure.label.suite:JSONPlaceholder

@api
Feature: JSON Placeholder API
  As a user of the JSON Placeholder API
  I want to be able to perform CRUD operations on todo items
  So that I can manage my tasks effectively

  Background:
    Given the API endpoint "https://jsonplaceholder.typicode.com/todos"

  Scenario: Create a new todo item
    When I create a new todo item with title "Buy groceries" and completed status false
    Then the response status code should be 201
    And the response body should contain the title "Buy groceries" and completed status false

  Scenario: Retrieve an existing todo item
    Given a todo item with ID 1 exists
    When I retrieve the todo item with ID 1
    Then the response status code should be 200
    And the response body should contain the title "delectus aut autem"

  Scenario: Update an existing todo item
    Given a todo item with ID 1 exists
    When I update the todo item with ID 1 to have title "Walk the dog" and completed status true
    Then the response status code should be 200
    And the response body should contain the title "Walk the dog" and completed status true

  Scenario: Delete an existing todo item
    Given a todo item with ID 1 exists
    When I delete the todo item with ID 1
    Then the response status code should be 200
    And retrieving the todo item with ID 1 should return a status code of 404
