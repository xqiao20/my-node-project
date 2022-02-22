import Bookmark from "../models/Bookmark";

export default interface BookmarkDaoI{
    findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]>;
    userBookmarksTuit(uid: string, tid: string) : Promise<any>;
    userUnbookmarksTuit(uid: string, tid: string) : Promise<any>;
}