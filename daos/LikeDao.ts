import LikeDaoI from "../interfaces/LikeDaoI";
import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";

export default class LikeDao implements LikeDaoI{
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    async findAllLikes(): Promise<Like[]> {
        return await LikeModel.find();
    }

    async findAllTuitsLikedByUser(uid: string): Promise<Like[]> {
        return await LikeModel.find({likeBy: uid}).populate("likedBy").exec();
    }

    async findAllUsersLikedThatTuit(tid: string): Promise<Like[]> {
        return await LikeModel.find({tuit: tid}).populate("tuit").exec();
    }

    async userLikesTuit(uid: string, tid: string): Promise<any> {
        return await LikeModel.create({tuit: tid, likedBy: uid});
    }

    async userUnlikesTuit(uid: string, tid: string): Promise<any> {
        return await LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }
}
