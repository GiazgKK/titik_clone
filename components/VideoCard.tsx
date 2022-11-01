import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { useRouter } from "next/router";
import useElementOnScreen from "../hooks/useElementOnScreen";
interface IProps {
  post: Video;
  idx: number;
}
const VideoCard: NextPage<IProps> = ({ post, idx }) => {
  const [videoError, setVideoError] = useState<Error>();
  const [cardProperties, setcardProperties] = useState({});
  const videoCardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isHover, SetIsHover] = useState(false);
  const [playing, setPlaying] = useState(!idx);

  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const dorong = document.body.offsetWidth;
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  };
  const isVisibile: boolean | undefined = useElementOnScreen(
    options,
    videoCardRef
  );
  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        setPlaying(true);
        videoRef?.current?.play();
      }
    } else {
      if (playing) {
        videoRef?.current?.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile]);

  const onVideoPres = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  // console.log("chekc", idx, videoRef);
  // useEffect(() => {
  // if (videoRef?.current) {
  //   videoRef.current.muted = isVideoMuted;
  // }
  //   if (videoCardRef?.current) {
  //     const cardProperties = videoCardRef.current.getBoundingClientRect();
  // if (
  //   cardProperties.bottom > 100 &&
  //   cardProperties.y < 400 &&
  //   cardProperties.y > -300
  // ) {
  //   videoRef?.current?.play();
  //   setPlaying(true);
  // } else {
  //   setPlaying(false);
  //   videoRef?.current?.pause();
  // }
  //   }
  //   console.log("check playing", idx, playing);
  // }, [isVideoMuted, videoCardRef?.current?.getBoundingClientRect()]);

  // useEffect(() => {
  //   const playVideo = async () => {
  //     await videoRef?.current?.play();
  //   };
  //   if (videoCardRef?.current) {
  //     console.log("chekc", idx, videoCardRef.current);
  //   }
  //   if (videoRef?.current) {
  //     if (idx === 0) {
  //       setIsVideoMuted(true);
  //       setPlaying(true);
  //       playVideo();
  //     }
  //   }
  // }, [videoCardRef]);
  console.log("check mute", idx, isVideoMuted);
  useEffect(() => {
    console.log(window.innerWidth);
  }, [window.innerWidth]);

  return (
    <div
      ref={videoCardRef}
      className="flex videocard flex-col border-b-2 border-gray-200 pb-6 z-10"
    >
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div
            className="md:w-16 md:h-16 w-10 h-10"
            onClick={() => router.push(`/profile/${post.postedBy._id}`)}
          >
            <Link href={`/profile/${post.postedBy._id}`} className="z-10">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post?.postedBy?.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex items-center gap-2">
              <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                {post.postedBy.userName}{" "}
                <GoVerified className="text-blue-400" />
              </p>
              <p className="capitalize font-medium text-gray-500 hidden md:block">
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => SetIsHover(true)}
          onMouseLeave={() => SetIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              muted={isVideoMuted}
              ref={videoRef}
              src={post.video.asset.url}
              loop={true}
              className="lg:w-[700px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>

          <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3 ">
            {playing ? (
              <button onClick={onVideoPres}>
                <BsFillPauseFill className="text-black text-2xl lg:text-4xl " />
              </button>
            ) : (
              <button onClick={onVideoPres}>
                <BsFillPlayFill className="text-black text-2xl lg:text-4xl " />
              </button>
            )}
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className="text-black text-2xl lg:text-4xl " />
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className="text-black text-2xl lg:text-4xl " />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
