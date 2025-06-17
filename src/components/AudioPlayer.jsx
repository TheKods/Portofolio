import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, SkipBack, SkipForward, Pause, Play } from 'lucide-react';

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(40); // Default volume: 40%
  const [showVolumeSlider, setShowVolumeSlider] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  
  const playerRef = useRef(null);
  const deviceIdRef = useRef(null);
  const animationRef = useRef(null);

  // Spotify playlist ID
  const PLAYLIST_ID = '2DplXBDNnbjfvXphw6hH71';

  // Default tracks in case API fails
  const defaultTracks = [
    { 
      title: "Memories of Spring",
      spotifyId: "3Pzl92mMKdr8R2OgzCYgfP",
      artist: "Tokyo Music Walker"
    },
    { 
      title: "Colorful Flowers",
      spotifyId: "5atpmQYwk9Jc77pEr0bCrV",
      artist: "Tokyo Music Walker"
    },
    { 
      title: "Echoes in Blue",
      spotifyId: "5mHDWWuktxDbbZ7Kjg99Ig",
      artist: "Tokyo Music Walker"
    },
    { 
      title: "Transcendence",
      spotifyId: "27PxTLjW12rVGglXr80Uen",
      artist: "CHAOS"
    }
  ];

  // Set random track on initial load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * (playlistTracks.length || defaultTracks.length));
    setCurrentTrackIndex(randomIndex);
  }, [playlistTracks]);

  // Load Spotify Web Playback SDK
  useEffect(() => {
    // Add Spotify script if not already loaded
    if (!window.Spotify) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      // Define callback for when Spotify SDK is ready
      window.onSpotifyWebPlaybackSDKReady = () => {
        initializeSpotifyPlayer();
      };

      return () => {
        document.body.removeChild(script);
        delete window.onSpotifyWebPlaybackSDKReady;
      };
    } else {
      initializeSpotifyPlayer();
    }
  }, []);

  // Fetch playlist tracks
  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      if (!spotifyToken) return;
      
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`, {
          headers: {
            'Authorization': `Bearer ${spotifyToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch playlist tracks');
        }
        
        const data = await response.json();
        
        // Extract track info
        const tracks = data.items.map(item => ({
          title: item.track.name,
          spotifyId: item.track.id,
          artist: item.track.artists.map(artist => artist.name).join(', ')
        }));
        
        setPlaylistTracks(tracks);
      } catch (error) {
        console.error('Error fetching playlist tracks:', error);
        // Use default tracks if playlist fetch fails
        setPlaylistTracks(defaultTracks);
      }
    };
    
    fetchPlaylistTracks();
  }, [spotifyToken]);

  // Initialize Spotify player
  const initializeSpotifyPlayer = async () => {
    try {
      // Get token from your backend or use a client credentials flow
      // For demo purposes, we'll use a placeholder approach
      // In a real app, you'd have a secure backend endpoint to get this token
      const token = await getSpotifyToken();
      setSpotifyToken(token);

      if (!token) {
        console.error("No Spotify token available");
        return;
      }

      // Create and configure the Spotify player
      const player = new window.Spotify.Player({
        name: 'Rafi Portfolio Web Player',
        getOAuthToken: cb => { cb(token); },
        volume: volume / 100
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error('Initialization error:', message);
        setIsLoading(false);
        fallbackToLocalAudio();
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error('Authentication error:', message);
        setIsLoading(false);
        fallbackToLocalAudio();
      });

      player.addListener('account_error', ({ message }) => {
        console.error('Account error:', message);
        setIsLoading(false);
        fallbackToLocalAudio();
      });

      player.addListener('playback_error', ({ message }) => {
        console.error('Playback error:', message);
        setIsLoading(false);
      });

      // Playback status updates
      player.addListener('player_state_changed', state => {
        if (state) {
          setIsPlaying(!state.paused);
          if (state.track_window?.current_track) {
            // Find the current track in our list by Spotify ID
            const currentTrack = state.track_window.current_track;
            const tracks = playlistTracks.length ? playlistTracks : defaultTracks;
            const foundIndex = tracks.findIndex(
              track => track.spotifyId === currentTrack.id.split(':').pop()
            );
            if (foundIndex !== -1) {
              setCurrentTrackIndex(foundIndex);
            }
          }
          setIsLoading(false);
        }
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Spotify player ready with device ID:', device_id);
        deviceIdRef.current = device_id;
        setPlayerReady(true);
        setIsLoading(false);
        
        // Play the current track once playlist is loaded
        const tracks = playlistTracks.length ? playlistTracks : defaultTracks;
        playTrack(tracks[currentTrackIndex].spotifyId, token, device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        setPlayerReady(false);
      });

      // Connect to the player
      player.connect();
      playerRef.current = player;

      return () => {
        player.disconnect();
      };
    } catch (error) {
      console.error("Error initializing Spotify player:", error);
      setIsLoading(false);
      fallbackToLocalAudio();
    }
  };

  // Play a specific track
  const playTrack = async (trackId, token, deviceId) => {
    if (!token || !deviceId) {
      console.error("Missing token or device ID");
      return;
    }

    setIsLoading(true);
    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [`spotify:track:${trackId}`] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    } catch (error) {
      console.error("Error playing track:", error);
      setIsLoading(false);
    }
  };

  // Fallback to local audio if Spotify fails
  const fallbackToLocalAudio = () => {
    console.log("Falling back to local audio or CDN");
    
    // Create audio element
    const audio = new Audio();
    
    // Check if local files exist
    const checkLocalFiles = async () => {
      try {
        // Try to fetch the first local file to see if it exists
        const localPath = `/music/${defaultTracks[currentTrackIndex].title.replace(/\s+/g, '-')}.mp3`;
        const response = await fetch(localPath, { method: 'HEAD' });
        if (response.ok) {
          audio.src = localPath;
          return true;
        }
        return false;
      } catch (error) {
        console.log("Local files not available");
        return false;
      }
    };
    
    // Try to use local files first, then CDN
    checkLocalFiles().then(hasLocalFiles => {
      if (!hasLocalFiles) {
        // Use CDN path based on track title
        const cdnPath = `https://cdn.chosic.com/free-music/tracks/${defaultTracks[currentTrackIndex].title.replace(/\s+/g, '-')}.mp3`;
        audio.src = cdnPath;
      }
      
      // Set up audio element
      audio.volume = volume / 100;
      audio.loop = false;
      
      // Set up event listeners
      audio.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
      });
      
      audio.addEventListener('ended', () => {
        playNextTrack();
      });
      
      audio.addEventListener('error', () => {
        console.error("Audio error, trying next track");
        setIsLoading(false);
        playNextTrack();
      });
      
      // Play audio
      if (isPlaying) {
        audio.play()
          .catch(error => {
            console.log("Playback prevented by browser:", error);
            setIsPlaying(false);
          });
      }
      
      // Save reference
      playerRef.current = {
        togglePlay: () => {
          if (audio.paused) {
            audio.play();
            setIsPlaying(true);
          } else {
            audio.pause();
            setIsPlaying(false);
          }
        },
        setVolume: (vol) => {
          audio.volume = vol;
        }
      };
    });
  };

  // Mock function to get a Spotify token
  // In a real app, you would get this from your backend
  const getSpotifyToken = async () => {
    // For demo purposes only
    // In production, NEVER expose your client secret in frontend code
    // Instead, make a request to your backend which securely handles authentication
    
    // This is a placeholder. You need to implement a proper token retrieval
    // from your secure backend endpoint
    try {
      // Simulating a backend call
      // Replace with actual fetch to your backend endpoint
      const response = await fetch('/api/spotify-token');
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error("Error getting Spotify token:", error);
      // For demo, return the token from the example
      // IMPORTANT: This is NOT secure and should NOT be used in production
      return 'BQCfWcsQiIS2NeONWcGmNk67T2cPItBegDDPpOXwHJ_rdjqKcGwVuLo04aVJ9NoQe8dWXOMcMfHkSO5FP1gJftfwwC7xOmA-IvbWGa7hBB9ungkAbj_8Vzf2jm2pkiLkSlt5h-eEh3YyV9TcKr8CwfOjlirByHIWSE8ZSb68qR74F_ikxdgjzAwVjLbvMbK-EmPXVc1BtbzU-wVHdECpdYHd2p2n5N9IlUIp_6MvzxJb1NYSLxiFsKMTnFdlExsx80ulgsjBcaXrm-8P1VEXfw7wLKujzrycOJIV5vpyQpkTz7k1oANrRwvB3xJ1fmby';
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (playerRef.current) {
      playerRef.current.togglePlay();
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.setVolume(volume / 100);
      } else {
        playerRef.current.setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  // Play next track
  const playNextTrack = () => {
    const tracks = playlistTracks.length ? playlistTracks : defaultTracks;
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    
    if (playerReady && deviceIdRef.current && spotifyToken) {
      playTrack(tracks[nextIndex].spotifyId, spotifyToken, deviceIdRef.current);
    }
  };

  // Play previous track
  const playPrevTrack = () => {
    const tracks = playlistTracks.length ? playlistTracks : defaultTracks;
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIndex);
    
    if (playerReady && deviceIdRef.current && spotifyToken) {
      playTrack(tracks[prevIndex].spotifyId, spotifyToken, deviceIdRef.current);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume / 100);
    }
    
    // If volume is set to 0, mute the player
    if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    } 
    // If volume is increased from 0, unmute the player
    else if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Get current track info
  const getCurrentTrack = () => {
    const tracks = playlistTracks.length ? playlistTracks : defaultTracks;
    return tracks[currentTrackIndex] || { title: "Loading...", artist: "" };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Track info (conditionally shown) */}
      <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm">
        {isLoading ? "Loading..." : `${getCurrentTrack().title} - ${getCurrentTrack().artist}`}
        {playerReady && <span className="ml-2 text-xs text-green-400">(Spotify)</span>}
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