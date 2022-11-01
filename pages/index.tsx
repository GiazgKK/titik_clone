import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResult from "../components/NoResult";
import { BASE_URL } from "../utils";
interface IProps {
  videos: Video[];
}
const Home = ({ videos }: IProps) => {
  const handleScroll = () => {
    console.log("check scroll");
  };
  console.log(videos);
  return (
    <div
      className="flex flex-col gap-10 videos h-full "
      onScroll={handleScroll}
    >
      {videos.length ? (
        videos.map((video: Video, idx: number) => (
          <VideoCard post={video} key={video._id} idx={idx} />
        ))
      ) : (
        <NoResult text="No results" />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data },
  };
};

export default Home;
