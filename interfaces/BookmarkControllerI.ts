import {Request, Response} from "express";

export default interface BookmarkControllerI{
    findAllBookmarks(req: Request, res: Response): void;
    deleteAllBookmarks(req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;
    userBookmarksTuit(req: Request, res: Response): void;
    userUnbookmarksTuit(req: Request, res: Response): void;
}