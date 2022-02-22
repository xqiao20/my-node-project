import Message from "../models/Message";

export default interface MessageDaoI{
    findAllSendToMessages(uid: string): Promise<Message[]>;
    findAllSendFromMessages(uid: string): Promise<Message[]>;
    userMessagesUser(uidA: string, uidB: string, message: string): Promise<any>;
    deleteMessage(mid: string): Promise<any>;
}