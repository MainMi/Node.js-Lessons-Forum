const studentsInfo = require('../constants/studentsInfo.js');
const renderType = require('../constants/renderType')

module.exports = {
    studentRender: (req, res) => {
        const { path, title, message, cssPath } = renderType.students.default
        res.render(path, { title, studentsInfo, message, cssPath })
    },
    studentRenderByName: (req, res) => {
        const { studentSurname } = req.params;
        const currentStudent = studentsInfo[studentSurname]
        if (currentStudent?.fullname) {
            const { path, title, message, cssPath } = renderType.students.byName
            res.render(path, { 
                title: title + currentStudent.fullname,
                message,
                cssPath,
                studentInfo: currentStudent
            })
        } else {
            const { path, title, message, cssPath } = renderType.error.notFound
            res.render( path, { title, message, cssPath })
        }
    }
};