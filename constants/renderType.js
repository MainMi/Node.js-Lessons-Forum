module.exports = {
    home: {
        default: {
            path: './page/home.ejs',
            title: 'Home',
            message: 'Welcome to our website',
            cssPath: ''
        }
    },
    students: {
        default: {
            path: './page/students.ejs',
            title: 'Students',
            message: 'Information about the students',
            cssPath: '/css/students.css'
        },
        byName: {
            path: './page/studentsByName.ejs',
            title: 'Students by ',
            message: 'Current student',
            cssPath: '/css/student-overview.css'
        }
    },
    error: {
        notFound: {
            path: './page/error/404.ejs',
            title: '404',
            message: 'Page not found',
            cssPath: ''
        }
    }
};