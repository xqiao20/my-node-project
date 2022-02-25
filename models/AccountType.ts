/**
 * @file Declares AccountType data type representing the type information of user account
 */

/**
 * @typedef AccountType Represents the type information of user account
 * @enum {string}
 * @property {string} Personal Personal account
 * @property {string} Academic Academic account
 * @property {string} Professional professional account
 */
enum AccountType {
    Personal = 'PERSONAL',
    Academic = 'ACADEMIC',
    Professional = 'PROFESSIONAL'
};
export default AccountType;

