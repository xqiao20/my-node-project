import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";

export default class MessageController implements MessageControllerI{
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;


    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages", MessageController.messageController.findAllSendFromMessages);
            app.get("/api/messages/:uid", MessageController.messageController.findAllSendToMessages);
            app.post("/api/users/:uidA/messages/:uidB", MessageController.messageController.userMessagesUser);
            app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {
    }



    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.send(status));


    findAllSendFromMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllSendFromMessages(req.params.uid)
            .then(messages => res.json(messages));

    findAllSendToMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllSendToMessages(req.params.uid)
            .then(messages => res.json(messages));

    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.params.uidA, req.params.uidB, req.body)
            .then(messages => res.json(messages));

}