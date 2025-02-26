const { test } = require('@playwright/test');

exports.customtest = test.extend({
    testDataForOrder: { //Custom fixture like "page or browser"
        email: "akhtarsameer743@gmail.com",
        password: "Sameerking01!",
        productName: "IPHONE 13 PRO"
    }
});