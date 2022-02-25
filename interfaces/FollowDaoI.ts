import Follow from "../models/Follow";

export default interface FollowDaoI{
    findAllFollows():Promise<Follow[]>;
    deleteAllFollows():Promise<any>;
    findAllFollowedByUsers(uid: string):Promise<Follow[]>;
    findAllFollowingUsers(uid: string): Promise<Follow[]>;
    userFollowsUser(uidA: string, uidB: string): Promise<any>;
    userUnfollowsUser(uidA: string, uidB: string): Promise<any>;
}