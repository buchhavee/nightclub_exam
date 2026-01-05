import { useState, useRef, useEffect, useCallback } from "react";

export interface Track {
  id: number;
  title: string;
  audioSrc: string;
  trackImg: string;
}

export interface UseAudioPlayerReturn {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentTrackIndex: number;
  isShuffle: boolean;
  currentTrack: Track;
  audioRef: React.RefObject<HTMLAudioElement | null>;

  togglePlay: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  setCurrentTrackIndex: (index: number) => void;
  toggleShuffle: () => void;
  formatTime: (time: number) => string;
}

export function useAudioPlayer(tracks: Track[]): UseAudioPlayerReturn {
  /* UseRef hooks*/
  const audioRef = useRef<HTMLAudioElement>(null);
  const loadedTrackSrc = useRef<string>("");

  /* State hooks */
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);

  const currentTrack = tracks[currentTrackIndex];

  /* Callback hooks */
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * tracks.length);
      } while (randomIndex === currentTrackIndex && tracks.length > 1);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
  }, [isShuffle, tracks.length, currentTrackIndex]);

  const handlePrev = useCallback(() => {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * tracks.length);
      } while (randomIndex === currentTrackIndex && tracks.length > 1);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    }
  }, [isShuffle, tracks.length, currentTrackIndex]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const progressBar = e.currentTarget;
      const clickX = e.clientX - progressBar.getBoundingClientRect().left;
      const width = progressBar.offsetWidth;
      const clickedTime = (clickX / width) * duration;

      if (audioRef.current) {
        audioRef.current.currentTime = clickedTime;
        setCurrentTime(clickedTime);
      }
    },
    [duration]
  );

  const formatTime = useCallback((time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (loadedTrackSrc.current !== currentTrack.audioSrc) {
      audio.src = currentTrack.audioSrc;
      audio.load();
      setCurrentTime(0);
      setDuration(0);
      loadedTrackSrc.current = currentTrack.audioSrc;
    }

    const handlePlayback = async () => {
      if (isPlaying) {
        if (audio.readyState >= 3) {
          await audio.play();
        } else {
          audio.addEventListener("canplay", () => audio.play(), { once: true });
        }
      } else {
        audio.pause();
      }
    };

    handlePlayback();
  }, [currentTrack, isPlaying]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    currentTrackIndex,
    isShuffle,
    currentTrack,
    audioRef,

    togglePlay,
    handleNext,
    handlePrev,
    handleVolumeChange,
    handleProgressClick,
    setCurrentTrackIndex,
    toggleShuffle,
    formatTime,
  };
}
