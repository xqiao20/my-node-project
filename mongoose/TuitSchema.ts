/**
 * @file Implements mongoose schema for tuits
 */
import mongoose, {Schema} from "mongoose";

/**
 * @typedef Tuit Represents data type of tuit
 * @property {string} tuit the content of this tuit
 * @property {Date} postedOn Date when the tuit posted
 * @property {ObjectId} postedBy Primary key of user who posted the tuit
 */
const TuitSchema = new mongoose.Schema({
    tuit:{type:String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'tuits'});
export default TuitSchema;