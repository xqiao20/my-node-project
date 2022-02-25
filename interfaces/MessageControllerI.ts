import {Request, Response} from "express";


export default interface MessageControllerI{
    findAllMessages(req: Request, res: Response): void;
    deleteAllMessages(req: Request, res: Response): void;
    findAllSendToMessages(req: Request, res: Response): void;
    findAllSendFromMessages(req: Request, res: Response): void;
    userMessagesUser(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
}