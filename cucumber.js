// cucumber.js
module.exports = {
    default: `--parallel 3 --format progress-bar --format html:cucumber-reporter.html --retry 1 --exit`,
  };
//   npx cucumber-js features/Ecommerce.feature --parallel 3 --exit --format html:cucumber-reporter.html
//  --tags "@Validation"