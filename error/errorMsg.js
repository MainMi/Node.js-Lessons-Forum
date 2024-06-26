module.exports = {
    NOT_VALID_TOKEN: {
        status: 401,
        errorStatus: 4010,
        message: 'Token is invalid'
    },
    NOT_IS_PROVIDED_TOKEN: {
        status: 401,
        errorStatus: 4011,
        message: 'No token provided'
    },
    WRONG_USERNAME_OR_PASSWORD: {
        status: 401,
        errorStatus: 4012,
        message: 'Wrong username or password'
    },
    WRONG_PASSWORD: {
        status: 401,
        errorStatus: 4013,
        message: 'Wrong password'
    },
    ACCESS_DENIED: {
        status: 403,
        errorStatus: 4030,
        message: 'Access denied'
    },
    PARAMS_IS_NOT_FOUND_FN: (paramsName) => ({
        status: 404,
        errorStatus: 4040,
        message: `Params: ${paramsName} not found`
    }),
    PARAMS_IS_NOT_FOUND: {
        status: 404,
        errorStatus: 4041,
        message: 'Params is not found'
    },
    TOPIC_IS_NOT_EXIST: {
        status: 404,
        errorStatus: 4042,
        message: 'Topic is not exist'
    },
    TOPIC_WAS_DELETED: {
        status: 404,
        errorStatus: 4043,
        message: 'Topic was deleted'
    },
    COMMENT_IS_NOT_EXIST: {
        status: 404,
        errorStatus: 4044,
        message: 'Comment is not exist'
    },
    COMMENT_WAS_DELETED: {
        status: 404,
        errorStatus: 4045,
        message: 'Comment was deleted'
    },
    TOPIC_UNCHANGED: {
        status: 404,
        errorCode: 4046,
        message: 'The new topic title and text match the existing data.'
    },
    COMMENT_UNCHANGED: {
        status: 404,
        errorCode: 4047,
        message: 'The new comment text match the existing data.'
    },
    USER_OR_EMAIL_IS_CREATED: {
        status: 409,
        errorStatus: 4090,
        message: 'This username or email is already taken'
    }
};
