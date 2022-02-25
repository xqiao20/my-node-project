/**
 * @file Implements mongoose schema for follows
 */

import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * @typedef Follow Represents relationship between users and another user,
 * as in user follows another user
 * @property {ObjectId} userFollowed User is followed by the given user
 * @property {ObjectId} userFollowing User follows another user
 */

const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed : {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing : {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});

export default FollowSchema;