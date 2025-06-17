import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, SkipBack, SkipForward, Pause, Play } from 'lucide-react';

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(40); // Default volume: 40%
  const [showVolumeSlider, setShowVolumeSlider] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  // List of local music tracks
  const musicTracks = [
    { 
      title: "Colorful Flowers",
      path: "/music/Colorful-Flowers(chosic.com).mp3",
      artist: "Tokyo Music Walker"
    },
    { 
      title: "Echoes In Blue",
      path: "/music/echoes-in-blue-by-tokyo-music-walker-chosic.com_.mp3",
      artist: "Tokyo Music Walker"
    },
    { 
      title: "Memories of Spring",
      path: "/music/Memories-of-Spring(chosic.com).mp3",
      artist: "Tokyo Music Walker"
    },
    { 
      title: "Transcendence",
      path: "/music/Transcendence-chosic.com_.mp3",
      artist: "Alexander Nakarada"
    }
  ];

  // Set random track on initial load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    setCurrentTrackIndex(randomIndex);
  }, []);

  // Initialize audio player
  useEffect(() => {
    const audio = new Audio(musicTracks[currentTrackIndex].path);
    audio.volume = volume / 100;
    audio.loop = false;
    
    // Set up event listeners
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      playNextTrack();
    });
    
    // Save reference to audio element
    audioRef.current = audio;
    
    // Auto play if isPlaying is true
    if (isPlaying) {
      audio.play()
        .catch(error => {
          console.log("Auto-play prevented by browser:", error);
          setIsPlaying(false);
        });
    }
    
    // Cleanup function
    return () => {
      audio.pause();
      audio.src = '';
      
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentTrackIndex]);

  // Handle autoplay issues with a user interaction check
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Playback prevented by browser:", error);
          });
        
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      // Clean up event listeners
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isPlaying]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Update play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
          .catch(error => {
            console.log("Playback prevented by browser:", error);
            setIsPlaying(false);
          });
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioRef.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.muted = false;
    } else {
      audioRef.current.muted = true;
    }
    
    setIsMuted(!isMuted);
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => 
      prevIndex === musicTracks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const playPrevTrack = () => {
    setCurrentTrackIndex((prevIndex) => 
      prevIndex === 0 ? musicTracks.length - 1 : prevIndex - 1
    );
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    
    // If volume is set to 0, mute the player
    if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.muted = true;
    } 
    // If volume is increased from 0, unmute the player
    else if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
  };

  const whilePlaying = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  // Format time in MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Track info (conditionally shown) */}
      <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm">
        {musicTracks[currentTrackIndex].title} - {musicTracks[currentTrackIndex].artist}
      </div>
      
      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <button 
          onClick={playPrevTrack}
          className="group relative p-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg"
          aria-label="Previous track"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <SkipBack className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
          </div>
        </button>
        
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className="group relative p-3 bg-black/30 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            ) : (
              <Play className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            )}
          </div>
        </button>
        
        {/* Mute/Unmute Button */}
        <button 
          onClick={toggleMute}
          onMouseEnter={() => setShowVolumeSlider(true)}
          className="group relative p-3 bg-black/30 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg"
          aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            ) : (
              <Volume2 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            )}
          </div>
        </button>
        
        {/* Next Button */}
        <button 
          onClick={playNextTrack}
          className="group relative p-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg"
          aria-label="Next track"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <SkipForward className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
          </div>
        </button>
      </div>
      
      {/* Volume slider */}
      {showVolumeSlider && (
        <div 
          className="bg-black/30 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 flex items-center"
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer; 