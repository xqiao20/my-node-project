import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

export default class MessageDao implements MessageDaoI{
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    async findAllSendFromMessages(uid: string): Promise<Message[]> {
        return await MessageModel.find({from: uid}).populate("from").exec();
    }

    async findAllSendToMessages(uid: string): Promise<Message[]> {
        return await  MessageModel.find({to: uid}).populate("to").exec();
    }

    async userMessagesUser(uidA: string, uidB: string, message: string): Promise<any> {
        return await MessageModel.create({message: message, from: uidA, to: uidB});
    }

    async deleteMessage(mid: string): Promise<any> {
        return await MessageModel.deleteOne({_id:mid});
    }
}