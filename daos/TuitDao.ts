/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 */
export default class TuitDao implements TuitDaoI {

    /**
     * Uses TuitModel to retrieve all Tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Uses TuitModel to retrieve all Tuit documents posted by the given user from
     * tuits collections
     * @param {string} userId User's primary key
     * @returns Promise To be notified when the tuits is retrieved from the database
     */
    async findTuitsByUser(userId: string): Promise<Tuit[]>{
        return await TuitModel.find({postedBy:userId});
    }

    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection
     * @param {string} tuitId Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    async findTuitById(tuitId: string): Promise<Tuit> {
        return await TuitModel.findById(tuitId);
    }

    /**
     * Inserts tuits instance into database
     * @param {String} userId User's primary key
     * @param {Tuit} tuit content of the tuit
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuitByUser(userId: String, tuit: Tuit): Promise<void> {
        return await TuitModel.create({...tuit, postedBy: userId});
    }

    /**
     * Remove tuit from the database.
     * @param {String} tuitId Primary key of tuit to be deleted
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tuitId: string):  Promise<any> {
        return await TuitModel.deleteOne({_id: tuitId});
    }

    /**
     * Update tuit with new values in database
     * @param {string} tuitId Primary key of tuit to be modified
     * @param {Tuit} tuit updated content of this tuit
     * @returns Promise To be notified when tuit is updated in th database
     */
    async updateTuit(tuitId: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tuitId}, {$set: tuit});
    }
}