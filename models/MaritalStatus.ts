/**
 * @file Declares MaritalStatus data type representing the marital status of user
 */

/**
 * @typedef MaritalStatus Represents the marital status of user
 * @enum {string}
 * @property {string} Married Married status of user
 * @property {string} Single Single status of user
 * @property {string} Widowed Widowed status of user
 */
enum MaritalStatus {
    Married = 'MARRIED',
    Single = 'SINGLE',
    Widowed = 'WIDOWED'
};
export default MaritalStatus;
