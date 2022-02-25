/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

/**
 * @class TuitController Implements RESTful Web service API for messages resource.
 * Defines the messaging HTTP endpoints:
 * <ul>
 *     <li>GET /api/messages to retrieve all messages
 *     </li>
 *     <li>DELETE /api/messages to remove all messages
 *     </li>
 *     <li>GET /api/users/:uid/messages to retrieve all users messaged by a user
 *     </li>
 *     <li>GET /api/messages/:uid to retrieve all users that messaging the given user
 *     </li>
 *     <li>POST /api/users/:uidA/messages/:uidB to record that a user A messages a user B
 *     </li>
 *     <li>DELETE /api/users/:uidA/messages/:uidB to record that a user A unmessages a user B</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;


    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/messages", MessageController.messageController.findAllMessages);
            app.delete("/api/messages", MessageController.messageController.deleteAllMessages);
            app.get("/api/users/:uid/messages", MessageController.messageController.findAllSendFromMessages);
            app.get("/api/messages/:uid", MessageController.messageController.findAllSendToMessages);
            app.post("/api/users/:uidA/messages/:uidB", MessageController.messageController.userMessagesUser);
            app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {
    }

    /**
     * Retrieves all messages from the database and returns an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessages()
            .then(messages => res.json(messages));

    /**
     * Removes all messages instance from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting all messages were successful or not
     */
    deleteAllMessages  = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessages()
            .then(status => res.json(status));


    /**
     * Retrieves all users messaged by a given user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user messageing the other user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were messaged
     */
    findAllSendFromMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllSendFromMessages(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all users that messaging a given user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the messaged user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that was messaged
     */
    findAllSendToMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllSendToMessages(req.params.uid)
            .then(messages => res.json(messages));


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uidA and uidB representing the userA that is messaging the userB
     * and userB that is messaged by userA
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.params.uidA, req.params.uidB, req.body)
            .then(messages => res.json(messages));

    /**
     * Removes a message instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.send(status));

}