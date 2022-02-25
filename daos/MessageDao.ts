/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI{
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * @returns Promise To be notified when all messages are retrieved from
     * database
     */
    async findAllMessages(): Promise<Message[]> {
        return await MessageModel.find();
    }

    /**
     * Removes all messages from the database.
     * @returns Promise To be notified when all messages are removed from the database
     */
    async deleteAllMessages(): Promise<any> {
        return await MessageModel.deleteMany({});
    }

    /**
     * Uses MessageModel to retrieve all message documents send from the given user from messages collection
     * @param {string} uid primary key of the user
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    async findAllSendFromMessages(uid: string): Promise<Message[]> {
        return await MessageModel.find({from: uid}).populate("from").exec();
    }

    /**
     * Uses MessageModel to retrieve all message documents send to the given user from messages collection
     * @param {string} uid primary key of the given user
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    async findAllSendToMessages(uid: string): Promise<Message[]> {
        return await  MessageModel.find({to: uid}).populate("to").exec();
    }


    /**
     * Insert message instance of the given user A messages the given userB.
     * @param {string} uidA Primary key of the given user sending message to other user
     * @param {string} uidB primary key of the user receives the message
     * @param {Message} message Message object to be inserted into the database
     * @returns Promise To be notified when the message is inserted into
     * database
     */
    async userMessagesUser(uidA: string, uidB: string, message: Message): Promise<any> {
        return await MessageModel.create({...message, from: uidA, to: uidB});
    }

    /**
     * Remove message instance from the database
     * @param {string} mid Primary key of the given message
     * @returns Promise To be notified when the message is removed from
     * database
     */
    async deleteMessage(mid: string): Promise<any> {
        return await MessageModel.deleteOne({_id:mid});
    }

}