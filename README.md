# playwright-reto-30-dias

# Inside that directory, you can run several commands:

  npx playwright test
#    Runs the end-to-end tests.

  npx playwright test --ui
#    Starts the interactive UI mode.

  npx playwright test --project=chromium
#    Runs the tests only on Desktop Chrome.

  npx playwright test example
#    Runs the tests in a specific file.

  npx playwright test --debug
#    Runs the tests in debug mode.

  npx playwright codegen
#    Auto generate tests with Codegen.

# We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - .\tests\example.spec.ts - Example end-to-end test
  - .\playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

npx playwright test --grep "@tag1" --project="Admin" --headed
# Ejecuta test que contengan el tag.


npx playwright test --grep "@tag1|@tag2" --project="Admin" --headed
# Ejecuta test que contengan alguno de los tags (o).

npx playwright test --grep "(?=.*@tag1) (?=.*@tag2)" --project="Admin" --headed
# Ejecuta test que contengan los 2 tags obligatoriamente (Y).

npx playwright test --grep-invert "@tag1" --project="Admin" --headed
# Ejecuta test que no contengan el tag (diferente).