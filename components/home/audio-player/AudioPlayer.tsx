"use client";

import { useState, useEffect } from "react";
import { useAudioPlayer, type Track } from "@/hooks/useAudioPlayer";
import Image from "next/image";
import { Play, Pause, Volume2, SkipForward, SkipBack, Shuffle } from "lucide-react";
import AudioPlayerGallery from "./AudioPlayerGallery";
import Title from "@/components/shared/Title/Title";

export default function AudioPlayer() {
  // track array
  const tracks: Track[] = [
    {
      id: 1,
      title: "YOU BELONG WITH ME 2",
      audioSrc: "/assets/media/black-box-funky.mp3",
      trackImg: "/assets/content-img/track1.jpg",
    },
    {
      id: 2,
      title: "EUPHORIA",
      audioSrc: "/assets/media/euphoria.mp3",
      trackImg: "/assets/content-img/track2.jpg",
    },
    {
      id: 3,
      title: "MIDNIGHT DANCE",
      audioSrc: "/assets/media/fashion-red-tape.mp3",
      trackImg: "/assets/content-img/track4.jpg",
    },
    {
      id: 4,
      title: "TRACK 4",
      audioSrc: "/assets/media/euphoria.mp3",
      trackImg: "/assets/content-img/track5.jpg",
    },
    {
      id: 5,
      title: "TRACK 5",
      audioSrc: "/assets/media/fashion-red-tape.mp3",
      trackImg: "/assets/content-img/track2.jpg",
    },
  ];
  // Håndter responsive billede visning
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowImage(window.innerWidth >= 1440);
    };

    // Sæt initial værdi
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { isPlaying, currentTime, duration, volume, currentTrackIndex, isShuffle, currentTrack, audioRef, togglePlay, handleNext, handlePrev, handleVolumeChange, handleProgressClick, setCurrentTrackIndex, toggleShuffle, formatTime } = useAudioPlayer(tracks);

  return (
    <section className="bg-black">
      <audio ref={audioRef}></audio>

      <Title title="Night Club Track" wrap={true} />

      {/* Afspiller */}
      <div className="max-w-360 w-full xl:p-0 sm:p-4 mx-auto my-12 sm:my-16 lg:my-24">
        <div className="flex flex-col items-center lg:flex-row lg:gap-8">
          {/* Track img */}
          {showImage && (
            <div className="w-86 h-77 bg-gray-800 shrink-0">
              <Image src={currentTrack.trackImg} alt={currentTrack.title} width={336} height={308} loading="lazy" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="w-full gap-2 sm:gap-4 lg:gap-6 flex flex-col justify-center px-4 md:px-0">
            <div className="flex justify-center md:justify-start mb-4">
              <h3 className="font-ubuntu font-medium text-[clamp(1rem,2vw,1.5rem)] tracking-[2.85px] uppercase text-white text-center text-nowrap leading-normal">{currentTrack.title}</h3>
            </div>

            {/* Progress bar */}
            <div className="mb-4 sm:mb-6 lg:mb-8 px-4 md:px-0">
              <div className="relative w-full h-1 bg-gray-200 cursor-pointer" onClick={handleProgressClick}>
                <div className="absolute h-full bg-primary" style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }} />

                {/* Cirkel til progress bar */}
                <div className="absolute w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full -top-2 sm:-top-2.5 transform -translate-x-1/2" style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }} />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row w-full items-center justify-center lg:justify-between gap-6 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
              {/* Timer */}
              <p className="text-white uppercase text-center lg:text-left text-sm sm:text-base mb-4 sm:mb-6 lg:mb-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>

              <div className="flex items-center justify-center gap-6 sm:gap-8 ml-12 md:ml-0">
                {/* skipback */}
                <button onClick={handlePrev} className="text-white hover:text-primary transition-colors">
                  <SkipBack className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>

                {/* play/pause */}
                <button onClick={togglePlay} className="text-white border-4 border-white rounded-full p-2 hover:border-primary hover:text-primary transition-colors">
                  {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
                </button>

                {/* skipforward */}
                <button onClick={handleNext} className="text-white hover:text-primary transition-colors">
                  <SkipForward className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>

                {/* shuffle */}
                <button onClick={toggleShuffle} className={`transition-colors hover:text-primary ${isShuffle ? "text-primary" : "text-white"}`}>
                  <Shuffle className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto justify-center max-w-xs lg:max-w-none">
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                <div className="relative w-full lg:w-32 h-1 bg-gray-200 rounded-full">
                  <div className="absolute h-full bg-primary rounded-full" style={{ width: `${volume * 100}%` }} />
                  <input type="range" min={0} max={1} step={0.01} value={volume} onChange={handleVolumeChange} className="absolute inset-0 w-full appearance-none cursor-pointer bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 sm:[&::-webkit-slider-thumb]:w-5 sm:[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 sm:[&::-moz-range-thumb]:w-5 sm:[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track gallery */}
      <AudioPlayerGallery tracks={tracks} currentTrackIndex={currentTrackIndex} onSelectTrack={setCurrentTrackIndex} />
    </section>
  );
}
