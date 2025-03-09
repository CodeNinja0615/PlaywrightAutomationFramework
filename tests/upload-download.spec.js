const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');

async function writeExcelTest(filePath, searchText, replaceText, change) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row + change.rowChange, output.col + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, col: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                // console.log(rowNumber + ', ' + colNumber);
                output.row = rowNumber
                output.col = colNumber

            }
        });
    });
    return output;
}

test('Upload download excel validation', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const [downloadPromise] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', {name: 'Download'}).click()
    ]);
    const filePath = 'Downloads/download.xlsx';
    await downloadPromise.saveAs(filePath);
    writeExcelTest(filePath, 'Mango', 350, {rowChange: 0, colChange: 2});
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles(filePath);
    const textLocator = page.getByText('Mango');
    const desiredRow = page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText("350");
});