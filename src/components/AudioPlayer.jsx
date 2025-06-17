import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(false); // Start unmuted by default now
  const playerRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [volume, setVolume] = useState(20); // Default volume: 20%
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // List of fun lofi music tracks (YouTube video IDs)
  const musicTracks = [
    { id: 'lTRiuFIWV54' }, // Lofi Hip Hop Radio - Beats to Relax/Study
    { id: '5qap5aO4i9A' }, // Lofi Girl - Beats to Relax/Study
    { id: 'DWcJFNfaw9c' }, // Chillhop Music - Lofi Hip Hop
    { id: 'tutZKLeGrCs' }, // Upbeat Lofi Hip Hop
    { id: 'X1SOtVNyGPo' }, // Jazzy Lofi Hip Hop
    { id: '7NOSDKb0HlU' }, // Upbeat & Fun Lofi
    { id: 'zVqJv_dKUEs' }, // Happy Lofi Beats
    { id: 'lniKA0hHhMM' }, // Fun & Groovy Lofi Mix
  ];

  // Set random track on initial load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    setCurrentTrackIndex(randomIndex);
  }, []);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-audio', {
        height: '0',
        width: '0',
        videoId: musicTracks[currentTrackIndex].id,
        playerVars: {
          autoplay: 1, // Set autoplay to 1
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          loop: 1,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 0
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(volume); // Set initial volume to 20%
            // Don't mute, let it play
            event.target.playVideo(); // Explicitly tell it to play
            setIsPlayerReady(true);
          }
        }
      });
    };

    // Cleanup
    return () => {
      window.onYouTubeIframeAPIReady = null;
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Change track when currentTrackIndex changes
  useEffect(() => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.loadVideoById({
        videoId: musicTracks[currentTrackIndex].id,
        startSeconds: 0
      });
      
      // Maintain mute state when changing tracks
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.playVideo();
      }
    }
  }, [currentTrackIndex, isPlayerReady]);

  // Update volume when it changes
  useEffect(() => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume, isPlayerReady]);

  // Handle autoplay issues with a user interaction check
  useEffect(() => {
    const handleUserInteraction = () => {
      if (isPlayerReady && playerRef.current) {
        playerRef.current.playVideo();
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
  }, [isPlayerReady]);

  const toggleMute = () => {
    if (!playerRef.current || !isPlayerReady) return;
    
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.playVideo();
    } else {
      playerRef.current.mute();
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
    
    // If volume is set to 0, mute the player
    if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
      playerRef.current?.mute();
    } 
    // If volume is increased from 0, unmute the player
    else if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      playerRef.current?.unMute();
      playerRef.current?.playVideo();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Hidden YouTube iframe */}
      <div id="youtube-audio" className="hidden"></div>
      
      {/* Volume slider (conditionally shown) */}
      {showVolumeSlider && (
        <div className="bg-black/30 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 flex items-center">
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
        
        {/* Mute/Unmute Button */}
        <button 
          onClick={toggleMute}
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
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
    </div>
  );
};

export default AudioPlayer; 