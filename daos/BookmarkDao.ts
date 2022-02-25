/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";


/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI{
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
     * @returns Promise To be notified when all bookmarks are retrieved from
     * database
     */
    async findAllBookmarks(): Promise<Bookmark[]> {
        return await BookmarkModel.find();
    }

    /**
     * Removes all bookmarks from the database.
     * @returns Promise To be notified when all bookmarks are removed from the database
     */
    async deleteAllBookmarks(): Promise<any> {
        return await BookmarkModel.deleteMany({});
    }



    /**
     * Uses BookmarkModel to retrieve all bookmark documents bookmarked by the given user from bookmarks collection
     * @param {string} uid primary key of the user
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    async findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({bookmarkedBy:uid}).populate("bookmarkedTuit").exec();
    }

    /**
     * Insert bookmark instance of the given user bookmarks the given tuit.
     * @param {string} uid Primary key of the given user
     * @param {string} tid primary key of the given tuit
     * @returns Promise To be notified when the bookmark is inserted into
     * database
     */
    async userBookmarksTuit(uid: string, tid: string): Promise<any> {
        return await BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});
    }


    /**
     * Remove bookmark instance of the given user bookmarks the given tuit.
     * @param {string} uid Primary key of the given user
     * @param {string} tid primary key of the given tuit
     * @returns Promise To be notified when the bookmark is removed from
     * database
     */
    async userUnbookmarksTuit(uid: string, tid: string): Promise<any> {
        return await BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});
    }

}