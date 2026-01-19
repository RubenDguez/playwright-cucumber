Feature: Login
  As a user I should be able to login into Salesforce

  Scenario: Successful Login
    Given I am on the Salesforce website
    When I enter valid credentials
    # And I click the login button
    Then I should be logged in successfully
  