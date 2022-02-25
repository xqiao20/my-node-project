/**
 * @file Implement mongoose schema for likes
 */
import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";

/**
 * @typedef Like Represents likes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {ObjectId} tuit Primary key of tuit being liked
 * @property {ObjectId} likedBy Primary key of user liking the tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit : {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy : {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});

export default LikeSchema;