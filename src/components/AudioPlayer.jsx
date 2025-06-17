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
  const [isLoading, setIsLoading] = useState(true);
  const [useLocalFiles, setUseLocalFiles] = useState(false);
  
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  // Music track definitions
  const musicTracks = [
    { 
      title: "Colorful Flowers",
      localPath: "/music/Colorful-Flowers(chosic.com).mp3",
      cdnPath: "https://cdn.chosic.com/free-music/tracks/Colorful-Flowers(chosic.com).mp3",
      artist: "Tokyo Music Walker"
    },
    { 
      title: "Echoes In Blue",
      localPath: "/music/echoes-in-blue-by-tokyo-music-walker-chosic.com_.mp3",
      cdnPath: "https://cdn.chosic.com/free-music/tracks/echoes-in-blue-by-tokyo-music-walker-chosic.com_.mp3",
      artist: "Tokyo Music Walker"
    },
    { 
      title: "Memories of Spring",
      localPath: "/music/Memories-of-Spring(chosic.com).mp3",
      cdnPath: "https://cdn.chosic.com/free-music/tracks/Memories-of-Spring(chosic.com).mp3",
      artist: "Tokyo Music Walker"
    },
    { 
      title: "Transcendence",
      localPath: "/music/Transcendence-chosic.com_.mp3",
      cdnPath: "https://cdn.chosic.com/free-music/tracks/Transcendence-chosic.com_.mp3",
      artist: "Alexander Nakarada"
    }
  ];

  // Check if local files exist
  useEffect(() => {
    const checkLocalFiles = async () => {
      try {
        // Try to fetch the first local file to see if it exists
        const response = await fetch(musicTracks[0].localPath, { method: 'HEAD' });
        if (response.ok) {
          setUseLocalFiles(true);
        }
      } catch (error) {
        console.log("Local files not available, using CDN instead");
        setUseLocalFiles(false);
      }
    };

    checkLocalFiles();
  }, []);

  // Get the appropriate path based on availability
  const getTrackPath = (track) => {
    return useLocalFiles ? track.localPath : track.cdnPath;
  };

  // Set random track on initial load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    setCurrentTrackIndex(randomIndex);
  }, []);

  // Initialize audio player
  useEffect(() => {
    setIsLoading(true);
    const audio = new Audio(getTrackPath(musicTracks[currentTrackIndex]));
    audio.volume = volume / 100;
    audio.loop = false;
    
    // Set up event listeners
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      setIsLoading(false);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      playNextTrack();
    });
    
    audio.addEventListener('error', (e) => {
      console.error("Audio error:", e);
      setIsLoading(false);
      
      // If local file fails, try CDN version
      if (useLocalFiles) {
        setUseLocalFiles(false);
        const cdnAudio = new Audio(musicTracks[currentTrackIndex].cdnPath);
        cdnAudio.volume = volume / 100;
        audioRef.current = cdnAudio;
        
        cdnAudio.play().catch(error => {
          console.log("Playback prevented:", error);
          playNextTrack(); // If CDN also fails, try next track
        });
      } else {
        playNextTrack(); // Try next track if current one fails
      }
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
      audio.removeEventListener('error', () => {});
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentTrackIndex, useLocalFiles]);

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
        {isLoading ? "Loading..." : `${musicTracks[currentTrackIndex].title} - ${musicTracks[currentTrackIndex].artist}`}
        {useLocalFiles && <span className="ml-2 text-xs text-green-400">(Local)</span>}
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