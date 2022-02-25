import Bookmark from "../models/Bookmark";

export default interface BookmarkDaoI{
    findAllBookmarks():Promise<Bookmark[]>;
    deleteAllBookmarks():Promise<any>;
    findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]>;
    userBookmarksTuit(uid: string, tid: string) : Promise<any>;
    userUnbookmarksTuit(uid: string, tid: string) : Promise<any>;
}