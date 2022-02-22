import {Request, Response} from "express";


export default interface MessageControllerI{
    findAllSendToMessages(req: Request, res: Response): void;
    findAllSendFromMessages(req: Request, res: Response): void;
    userMessagesUser(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
}