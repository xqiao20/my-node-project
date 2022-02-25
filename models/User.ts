/**
 * @file Declares User data type
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @typedef User Represents data type of user
 * @property {string} username username of user
 * @property {string} password password of user
 * @property {string} firstName the first name of user
 * @property {string} lastName the last name of user
 * @property {string} email Email of the given user
 * @property {string} profilePhoto the photo in the profile of user
 * @property {string} headerImage the image in the header of user
 * @property {AccountType} accountType the type of user account
 * @property {MaritalStatus} maritalStatus the marital status of user
 * @property {string} biography the biography information of user
 * @property {Date} dateOfBirth the date of birth of user
 * @property {Date} joined the date user added in the database
 * @property {Location} location the location of user
 */
export default class User {
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}

