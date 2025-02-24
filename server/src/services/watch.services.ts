import AppError from "../errors/AppError";
import { IWatchLecture } from "../interfaces/watch.interface";
import lectureModel from "../models/lecture.model";
import UserModel from "../models/user.model";
import watchModule from "../models/watch.module";
import { convertObjectIdToId } from "../utils/convertObjectId";
import httpStatus from "http-status";

const findUser = async (userId: string) => {
  const user = await UserModel.findById(userId).lean();
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const getCompletedLectureIds = async (userId: string, moduleIds: string[]) => {
  const completedLectures = await watchModule
    .find({
      user: userId,
      module: {
        $in: moduleIds,
      },
      state: "COMPLETED",
    })
    .select("lecture");

  return completedLectures.map((doc) => doc.lecture);
};

const markedAsLectureCompleted = async (payload: IWatchLecture) => {
  await findUser(payload.user.toString());
  const alreadyCreated = await watchModule.findOne(payload);

  if (alreadyCreated) {
    throw new AppError(httpStatus.CONFLICT ,"You have already watched this lecture");
  }
  const lecture = await lectureModel.findById(payload.lecture).lean();

  if (!lecture) {
    throw new AppError(httpStatus.NOT_FOUND, "Lecture not found");
  }
  const watchLecture = await watchModule.create({...payload , module: lecture.module});
  return convertObjectIdToId(watchLecture.toObject());
};

const updateWatchLectureState = async (payload: Partial<IWatchLecture>) => {
  if (!payload.user || !payload.module || !payload.state) {
    throw new AppError(httpStatus.BAD_REQUEST, "All fields are required");
  }
  await findUser(payload.user.toString());

  const findWatchLecture = await watchModule.findOne(payload);
  if (!findWatchLecture) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You have not watched this lecture"
    );
  }

  const watchLecture = await watchModule
    .findOneAndUpdate(
      { user: payload.user, module: payload.module },
      { state: payload.state },
      {
        new: true,
        runValidators: true,
      }
    )
    .lean();

  return convertObjectIdToId(watchLecture);
};

export const WatchServices = {
  getCompletedLectureIds,
  markedAsLectureCompleted,
  updateWatchLectureState,
};
