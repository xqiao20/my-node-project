import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";


export default class BookmarkDao implements BookmarkDaoI{
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    async findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({bookmarkedBy:uid}).populate("bookbarkedBy").exec();
    }

    async userBookmarksTuit(uid: string, tid: string): Promise<any> {
        return await BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});
    }

    async userUnbookmarksTuit(uid: string, tid: string): Promise<any> {
        return await BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});
    }

}