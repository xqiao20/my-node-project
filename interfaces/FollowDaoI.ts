import Follow from "../models/Follow";

export default interface FollowDaoI{
    findAllFollowedByUsers(uid: string):Promise<Follow[]>;
    findAllFollowingUsers(uid: string): Promise<Follow[]>;
    userFollowsUser(uidA: string, uidB: string): Promise<any>;
    userUnfollowsUser(uidA: string, uidB: string): Promise<any>;
}