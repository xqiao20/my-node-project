/**
 * @file Declares Message data type representing relationship between
 * users and another user, as in user messages another user
 */
import User from "./User";

/**
 * @typedef Message Represents messages relationship between a user and another user,
 * as in a user messages another user
 * @property {Message} message Message being sent
 * @property {User} to User receives the message
 * @property {User} from User sent the message
 * @property {Date} sentOn Date when the message sent
 */
export default interface Message{
    message: Message;
    to: User;
    from: User;
    sentOn: Date;
}