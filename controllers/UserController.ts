/**
 * @file Controller RESTful Web service API for users resource
 */

import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users to create a new user instance</li>
 *     <li>GET /api/users to retrieve all the user instances</li>
 *     <li>GET /api/users/:uid to retrieve an individual user instance </li>
 *     <li>PUT /api/users to modify an individual user instance </li>
 *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
 *     <li>DELETE /api/users to remove all users instance</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 @property {Express} app framework to get RESTful Web Service API
 */
export default class UserController implements UserControllerI {
    app: Express;
    userDao: UserDao;
    constructor(app: Express, userDao: UserDao) {
        this.app = app;
        this.userDao = userDao;
        this.app.get('/api/users', this.findAllUsers);
        this.app.get('/api/users/:userid', this.findUserById);
        this.app.post('/api/users', this.createUser);
        this.app.delete('/api/users/:userid', this.deleteUser);
        this.app.put('/api/users/:userid', this.updateUser);
        this.app.delete('/api/users', this.deleteAllUsers);
    }

    /**
     * Retrieves all users from the database and returns an array of users.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsers = (req: Request, res: Response) =>
        this.userDao.findAllUsers()
            .then(users => res.json(users));

    /**
     * Retrieves the user by their primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    findUserById = (req: Request, res: Response) =>
        this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));

    /**
     * Creates a new user instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    createUser = (req: Request, res: Response) =>
        this.userDao.createUser(req.body)
            .then(user => res.json(user));

    /**
     * Removes a user instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteUser = (req: Request, res: Response) =>
        this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));


    /**
     * Modifies an existing user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    updateUser = (req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));

    /**
     * Removes all user instance from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting all users was successful or not
     */
    deleteAllUsers= (req: Request, res: Response) =>
        this.userDao.deleteAllUsers()
            .then(status => res.json(status));
}

