import {Request, Response} from "express";


export default interface FollowControllerI{
    findAllFollowedByUsers(req: Request, res: Response): void;
    findAllFollowingUsers(req: Request, res: Response): void;
    userFollowsUser(req: Request, res: Response): void;
    userUnfollowsUser(req: Request, res: Response): void;
}