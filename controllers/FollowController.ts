/**
 * @file Controller RESTful Web service API for follows resource
 */

import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";
import FollowModel from "../mongoose/FollowModel";

/**
 * @class TuitController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/follows to retrieve all follows
 *     </li>
 *     <li>DELETE /api/follows to remove all follows
 *     </li>
 *     <li>GET /api/users/:uid/follows to retrieve all users followed by a user
 *     </li>
 *     <li>GET /api/follows/:uid to retrieve all users that following the given user
 *     </li>
 *     <li>POST /api/users/:uidA/follows/:uidB to record that a user A follows a user B
 *     </li>
 *     <li>DELETE /api/users/:uidA/follows/:uidB to record that a user A unfollows a user B</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI{
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/follows", FollowController.followController.findAllFollows);
            app.delete("/api/follows", FollowController.followController.deleteAllFollows);
            app.get("/api/users/:uid/follows/", FollowController.followController.findAllFollowedByUsers);
            app.get("/api/follows/:uid", FollowController.followController.findAllFollowingUsers);
            app.post("/api/users/:uidA/follows/:uidB", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uidA/unfollows/:uidB", FollowController.followController.userUnfollowsUser);
        }
        return FollowController.followController;
    }
    private constructor() {
    }
    /**
     * Retrieves all follows from the database and returns an array of follows.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows objects
     */
    findAllFollows = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollows()
            .then(follows => res.json(follows));

    /**
     * Removes all follows instance from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting all follows were successful or not
     */
    deleteAllFollows  = (req: Request, res: Response) =>
        FollowController.followDao.deleteAllFollows()
            .then(status => res.json(status));

    /**
     * Retrieves all follows from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were followed
     */
    // findAllFollows = (req: Request, res: Response) =>
    //     FollowController.followDao.findAllFollows().then(follows => res.json(follows));


    /**
     * Retrieves all users followed by a given user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user following the other user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were followed
     */
    findAllFollowedByUsers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowedByUsers(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that following a given user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the followed user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that was followed
     */
    findAllFollowingUsers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowingUsers(req.params.uid)
            .then(follows => res.json(follows));


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uidA and uidB representing the userA that is following the userB
     * and userB that is followed by userA
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uidA, req.params.uidB)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uidA and uidB representing the userA that is unfollowing the userB
     * and userB that is unfollowed by userA
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uidA, req.params.uidB)
            .then(status => res.send(status));
}

