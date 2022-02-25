/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */

import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";


/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}


    /**
     * Uses FollowModel to retrieve all follow documents from follows collection
     * @returns Promise To be notified when all follows are retrieved from
     * database
     */
    async findAllFollows(): Promise<Follow[]> {
        return await FollowModel.find();
    }

    /**
     * Removes all follows from the database.
     * @returns Promise To be notified when all follows are removed from the database
     */
    async deleteAllFollows(): Promise<any> {
        return await FollowModel.deleteMany({});
    }



    /**
     * Uses FollowModel to retrieve all follow documents followed by the given user from follows collection
     * @param {string} uid primary key of the user
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    async findAllFollowedByUsers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowing: uid}).populate("userFollowing").exec();
    }

    /**
     * Uses FollowModel to retrieve all follow documents following the given user from follows collection
     * @param {string} uid primary key of the given user
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    async findAllFollowingUsers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowed: uid}).populate("userFollowed").exec();
    }

    /**
     * Insert follow instance of the given user A follows the given userB.
     * @param {string} uidA Primary key of the given user following other user
     * @param {string} uidB primary key of the user followed by the given user
     * @returns Promise To be notified when the follow is inserted into
     * database
     */
    async userFollowsUser(uidA: string, uidB: string): Promise<any> {
        return await FollowModel.create({userFollowed: uidA, userFollowing: uidB});
    }

    /**
     * Remove follow instance of the given user A follows the given userB.
     * @param {string} uidA Primary key of the given user following other user
     * @param {string} uidB primary key of the user followed by the given user
     * @returns Promise To be notified when the follow is removed from
     * database
     */
    async userUnfollowsUser(uidA: string, uidB: string): Promise<any> {
        return await FollowModel.deleteOne({userFollowed: uidA, userFollowing: uidB});
    }

}