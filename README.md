# 🎭✨ Playwright Automation Framework with Cucumber.js, Allure & HTML Reporting

![Playwright](https://img.shields.io/badge/Playwright-Testing-blueviolet?logo=playwright&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Supported-blue?logo=typescript&style=flat-square)
![Allure](https://img.shields.io/badge/Allure-Reporting-orange?logo=allure&style=flat-square)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-brightgreen?logo=cucumber&style=flat-square)

A modern end-to-end test automation framework using **Playwright**, **TypeScript**, **Cucumber.js**, **Allure**, and **HTML Reporting** with support for **parallel testing**, **Jenkins**, and **Azure DevOps Pipelines**.

---

## ⚙️ Installation

### 📦 Install framework dependencies

```bash
npm install
npx playwright install
npm install -g allure-commandline --save-dev
npm install allure-commandline --save-dev
```

# 🧰 Tech Stack

🎭 Playwright
🔵 TypeScript
🥒 Cucumber.js
📊 Allure Reporter
📄 Playwright's HTML Reporting
☁️ CI Integration with Jenkins and Azure Pipelines

# Execution commands
```bash
npx playwright test
npx cucumber-js --tags "@smoke"
npx playwright test --project=chromium
```
# 📁 Project Structure
```
├── tests/                      # Step definitions and test logic
├── features/                   # Feature files (BDD)
├── reports/                    # Allure and HTML reports
├── playwright.config.ts        # Playwright configuration
├── cucumber.js                 # Cucumber config
├── package.json
├── tsconfig.json
└── README.md
```

# 📊 Reporting
**📈 Allure Report**

```bash
Generate results: npx allure generate ./allure-results --clean -o ./allure-report
Open the report: npx allure open ./allure-report
Clean previous results (optional): rm -rf allure-results allure-report
```

**🌐 HTML Report**
Playwright’s default HTML report can be viewed using:

```bash
npx playwright show-report
```

# 🏷 Tag-based Execution
**Feature files:**
```
    @smoke
    Scenario: User can log in successfully
```
**Run tagged tests:**

```bash
npx cucumber-js --tags "@smoke"
```


# 📚 Common Commands
**Command	Description**
```bash
Install project dependencies: npm install
Install Playwright browsers: npx playwright install	
Run tests: npx playwright test	
Run BDD-style tests: npx cucumber-js	
Generate Allure report: npx allure generate ...	
View Allure report: npx allure open ...	
Open Playwright HTML report: npx playwright show-report	
```