/**
 * @file Controller RESTful Web service API for tuits resource
 */
import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:userid/tuits to create a new tuit instance for
 *     a given user</li>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/tuits/:tuitid to retrieve a particular tuit instances</li>
 *     <li>GET /api/users/:userid/tuits to retrieve tuits for a given user </li>
 *     <li>PUT /api/tuits/:tuitid to modify an individual tuit instance </li>
 *     <li>DELETE /api/tuits/:tuitid to remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {Express} app framework to get RESTful Web Service API
 */
export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, TuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = TuitDao;
        this.app.get('/api/tuits', this.findAllTuits);
        this.app.get('/api/tuits/:tuitid', this.findTuitById);
        this.app.get('/api/users/:userid/tuits', this.findTuitsByUser);
        this.app.post('/api/users/:userid/tuits', this.createTuitByUser);
        this.app.delete('/api/tuits/:tuitid', this.deleteTuit);
        this.app.put('/api/tuits/:tuitid', this.updateTuit);
    }

    /**
     * Retrieves all tuits from the database and returns an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit that matches the user ID
     */
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit));

    /**
     * Retrieves all tuits from the database for a particular user and returns
     * an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.userid)
            .then(tuit => res.json(tuit));

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the
     * database
     */
    createTuitByUser = (req: Request, res: Response) =>
        this.tuitDao.createTuitByUser(req.params.userid, req.body)
            .then(tuit => res.json(tuit));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then(status => res.json(status));
}

