const fs = require('fs');
const path = require('path');

const studentsInfoJSONFilePath = path.join(__dirname, 'studentsInfo.json');
const fileData = fs.readFileSync(studentsInfoJSONFilePath);
const studentsInfo = JSON.parse(fileData);

module.exports = studentsInfo;
