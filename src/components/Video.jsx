import { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import GradientBg from "./GradientBg";
import videoSrc from "../assets/video.mp4";
import videoThumbnail from "../assets/video.png";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
    };
  }, []);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <GradientBg>
      <>
        <video
          ref={videoRef}
          className="w-full h-full min-h-[45rem] aspect-video object-cover rounded-2xl"
          src={videoSrc}
          poster={videoThumbnail}
          controls
        ></video>

        {!isPlaying && (
          <button
            className="w-[4rem] h-[4rem] overflow-hidden rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20"
            onClick={handlePlayButtonClick}
          >
            <div className="w-[4rem] h-[4rem] bg-[#0F42F2] grid place-items-center">
              <FaPlay className="w-4 h-4" />
            </div>
          </button>
        )}
      </>
    </GradientBg>
  );
};

export default Video;
