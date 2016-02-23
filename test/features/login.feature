Feature: Can login on the web-platform
  In order to perform actions on the web platform
  As a registered user
  I shall be able to login


  Background:
    Given I browse "http://localhost:9080/"

  Scenario: [USER] can log through the web form
    Given I am on homepage
    When I follow "a[title=Login]"
    Then I fill in "input[name=fieldLogin]" with "karine"
    Then I fill in "input[name=fieldPassword]" with "abc"
    Then I follow "button[title=Submit]"
    Then I take a screenshot