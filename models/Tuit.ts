/**
 * @file Declares Tuit data type
 */
import User from "./User";

/**
 * @typedef Tuit Represents data type of tuit
 * @property {string} tuit the content of this tuit
 * @property {Date} postedOn Date when the tuit posted
 * @property {User} postedBy User who posted the tuit
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}

