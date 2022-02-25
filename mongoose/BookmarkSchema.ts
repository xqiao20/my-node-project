/**
 * @file Implement mongoose schema for bookmarks
 */

import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";

/**
 * @typeof Bookmark Represents bookmarks relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {ObjectId} bookmarkedTuit Primary key of bookmarked tuit
 * @property {ObjectId} bookmarkedBy Primary key of user bookmarked the tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit : {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy : {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});

export default BookmarkSchema;