@echo off
cls

echo ======================================
echo        RUNNING SMOKE SUITE
echo ======================================

npx playwright test --grep "@smoke"

echo ======================================
echo     GENERATING ALLURE REPORT
echo ======================================

npx allure generate allure-results --clean -o allure-report
npx allure open allure-report

pause
