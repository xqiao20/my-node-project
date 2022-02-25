/**
 * @file Declares Follow data type representing relationship between
 * users and another user, as in user follows another user
 */
import User from "./User"

/**
 * @typedef Follow Represents relationship between users and another user,
 * as in user follows another user
 * @property {User} userFollowed User is followed by the given user
 * @property {User} userFollowing User follows another user
 */
export default interface Follow{
    userFollowed : User;
    userFollowing : User;
}