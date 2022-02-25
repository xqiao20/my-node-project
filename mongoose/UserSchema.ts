/**
 * @file Implements mongoose schema for users
 */
import mongoose from "mongoose";

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

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
}, {collection: 'users'});
export default UserSchema;

