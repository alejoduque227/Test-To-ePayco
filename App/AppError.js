/**
 *
 * @param message
 * @param errors
 * @param status
 * @returns {Error}
 */
module.exports = (message, errors, status) => {
    const error = new Error(message);
    error.isFromApp = true;
    error.errors = errors || undefined;
    error.status = status || http.codes['Bad Request'];
    return error;
};
