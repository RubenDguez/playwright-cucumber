Feature: Search

  Search capability for products

  Scenario: Search for product
    Given I am on the BestBuy website
    When I search for Headphones
    Then I should see multiple products related the search
