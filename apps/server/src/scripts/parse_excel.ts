import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '../../../../Smashpoint_Pickleball_Master_Planner.xlsx');

try {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        process.exit(1);
    }

    const workbook = XLSX.readFile(filePath);
    const result: any = {};

    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        result[sheetName] = data;
    });

    console.log(JSON.stringify(result, null, 2));

} catch (error) {
    console.error('Error reading excel file:', error);
}
