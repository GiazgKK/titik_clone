import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

interface Iprops {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDislike, likes }: Iprops) => {
  const [alreadyLike, setAlreadyLike] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter?.((item) => item._ref === userProfile?._id);
  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLike(true);
    } else {
      setAlreadyLike(false);
    }
  }, [likes, filterLikes]);
  return (
    <div className=" flex gap-6 ">
      <div className="mt-4 flex flex-col justify-center cursor-pointer items-center">
        {alreadyLike ? (
          <div className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]">
            <MdFavorite
              className="text-lg md:text-2xl"
              onClick={handleDislike}
            />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2 md:p-4 text-gray-400">
            <MdFavorite className="text-lg md:text-2xl" onClick={handleLike} />
          </div>
        )}
        <p className="text-md font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
