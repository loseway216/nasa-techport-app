# Build a frontend for the NASA TechPort API

The NASA TechPort API (<https://techport.nasa.gov/help/articles/api>) exposes project data of NASA related projects. Your task is to build an appealing frontend for browsing through these projects.

## Minimum requirements

- Show a list of projects which were updated in the last 7 days. The user must be able to change the interval.
  - List items must at least contain the name, start and end of the project.
  - List must be paginate-able (10, 25, 50 items).
- Selecting a list item should show details of the project. Project details should contain at least:
  - The lead and supporting organizations.
  - All available contact persons, including their function in the project.
  - Up to you to decide which other information is important to show.
- It may return a huge bulk of data. The frontend must not freeze and ensure that subsequent pagination requests are fast.

## Technical requirements

- Use Vue.js (+ Nuxt.js if needed)
- Provide meaningful tests for your code.
- You are allowed to use any 3rd-party library for styling & testing you want.
- We'd like to see code like you would do for production-ready systems, so think of edge cases, UI glitches, and some basic optimizations.

Create a project on CodeSandbox and share the link of your result with us.
