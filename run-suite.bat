@echo off
cls

echo ==========================================
echo        PLAYWRIGHT TEST RUNNER
echo ==========================================
echo 1. Run SANITY Suite
echo 2. Run REGRESSION Suite
echo 3. Run AUTOMATION Suite
echo 4. Run FULL Test Suite
echo 5. Run CLASS (Spec File)
echo 6. Run CLASS + SANITY
echo 7. Run CLASS + REGRESSION
echo 8. Run ADMIN REGRESSION
echo ==========================================
echo.

set /p choice=Enter your choice (1-8):

REM ---------------- SANITY SUITE ----------------
if "%choice%"=="1" (
    echo Running SANITY Suite...
    npx playwright test --grep "@sanity"
)

REM ---------------- REGRESSION SUITE ----------------
if "%choice%"=="2" (
    echo Running REGRESSION Suite...
    npx playwright test --grep "@regression"
)

REM ---------------- AUTOMATION SUITE ----------------
if "%choice%"=="3" (
    echo Running AUTOMATION Suite...
    npx playwright test --grep "@automation"
)

REM ---------------- FULL SUITE ----------------
if "%choice%"=="4" (
    echo Running FULL Test Suite...
    npx playwright test
)

REM ---------------- CLASS ONLY ----------------
if "%choice%"=="5" (
    echo.
    echo Enter spec file path (example: tests/auth/login.spec.ts)
    set /p filepath=Spec file path:
    npx playwright test %filepath%
)

REM ---------------- CLASS + SANITY ----------------
if "%choice%"=="6" (
    echo.
    echo Enter spec file path:
    set /p filepath=Spec file path:
    echo Running only @sanity tests in %filepath%
    npx playwright test %filepath% --grep "@sanity"
)

REM ---------------- CLASS + REGRESSION ----------------
if "%choice%"=="7" (
    echo.
    echo Enter spec file path:
    set /p filepath=Spec file path:
    echo Running only @regression tests in %filepath%
    npx playwright test %filepath% --grep "@regression"
)

REM ---------------- CLASS + ADMIN REGRESSION ----------------
if "%choice%"=="8" (
    echo.
    echo Enter spec file path:
    set /p filepath=Spec file path:
    echo Running ADMIN REGRESSION tests in %filepath%
    set TEST_ROLE=ADMIN
    npx playwright test "%filepath%" --grep "@regression"
)

echo.
echo ==========================================
echo        EXECUTION COMPLETED
echo ==========================================
pause
