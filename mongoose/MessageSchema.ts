/**
 * @file Implements mongoose schema for messages
 */
import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @typedef Message Represents messages relationship between a user and another user,
 * as in a user messages another user
 * @property {String} message Message being sent
 * @property {ObjectId} to User receives the message
 * @property {ObjectId} from User sent the message
 * @property {Date} sentOn Date when the message sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message:{type: String},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from : {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn : {type: Date, default: Date.now},
}, {collection: "messages"});

export default MessageSchema;