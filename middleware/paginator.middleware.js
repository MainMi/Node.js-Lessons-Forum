const { validateWith } = require("../helpers");
const { getPaginatedValidator, getAllRecordsValidator } = require("../validator");
const { checkIfAdminDynamically } = require("./user.middleware");

module.exports = {
    isPaginatedParamsValid: validateWith(getPaginatedValidator, 'query'),

    isAllRecordsParamsValid: validateWith(getAllRecordsValidator, 'query'),

    isAdminIfDeletedDataRequested: checkIfAdminDynamically('query', 'skipDeleted')
};
