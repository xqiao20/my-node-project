import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}


    async findAllFollowedByUsers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowed: uid}).populate("userFollowed").exec();
    }

    async findAllFollowingUsers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowing: uid}).populate("userFollowing").exec();
    }

    async userFollowsUser(uidA: string, uidB: string): Promise<any> {
        return await FollowModel.create({userFollowed: uidB, userFollowing: uidA});
    }

    async userUnfollowsUser(uidA: string, uidB: string): Promise<any> {
        return await FollowModel.deleteOne({userFollowed: uidB, userFollowing: uidA});
    }

}