const path = require('path');
const studentsInfo = require('../constants/studentsInfo');
const renderType = require('../constants/renderType');

const studentsInfoJSONFilePath = path.join(__dirname, '../constants/studentsInfo.json');

const fs = require('fs');

const renderStudentByName = (currentStudent, res) => {
    const { path, title, message, cssPath } = currentStudent?.fullname ? renderType.students.byName : renderType.error.notFound;
    const studentInfo = currentStudent?.fullname ? { title: title + currentStudent.fullname, message, cssPath, studentInfo: currentStudent } : { title, message, cssPath };
    res.render(path, studentInfo);
};

module.exports = {
    studentRender: (req, res) => {
        const { path, title, message, cssPath } = renderType.students.default;
        res.render(path, { title, studentsInfo, message, cssPath });
    },

    studentRenderByName: (req, res) => {
        const { studentSurname } = req.params;
        const currentStudent = studentsInfo[studentSurname];
        renderStudentByName(currentStudent, res);
    },

    studentRenderByNameSync: (req, res) => {
        const { studentSurname } = req.params;
        const fileData = fs.readFileSync(studentsInfoJSONFilePath);
        const data = JSON.parse(fileData);
        const currentStudent = data[studentSurname];
        renderStudentByName(currentStudent, res);
    },

    studentRenderByNameCallback: (req, res) => {
        const { studentSurname } = req.params;
        fs.readFile(studentsInfoJSONFilePath, (err, fileData) => {
            if (err) throw err;
            const data = JSON.parse(fileData);

            const currentStudent = data[studentSurname];
            renderStudentByName(currentStudent, res);
        });
    },

    studentRenderByNamePromise: (req, res) => {
        const { studentSurname } = req.params;
        fs.promises.readFile(studentsInfoJSONFilePath)
            .then(fileData => {
                const data = JSON.parse(fileData);
                const currentStudent = data[studentSurname];
                renderStudentByName(currentStudent, res);
            })
            .catch(err => {
                console.error(err);
                res.JSON(err);
            });
    },

    studentRenderByNameAsync: async (req, res) => {
        const { studentSurname } = req.params;
        try {
            const fileData = await fs.promises.readFile(studentsInfoJSONFilePath);
            const data = JSON.parse(fileData);
            const currentStudent = data[studentSurname];
            renderStudentByName(currentStudent, res);
        } catch(e) {
            console.error(err);
            res.JSON(err);
        }
    }
};
