import React, { useEffect, useMemo, useRef, useState } from "react";

const WIDGET_SRC = "https://w.soundcloud.com/player/?url=";
const API_SRC = "https://w.soundcloud.com/player/api.js";

export default function SoundCloudPlayer({
  playlist = [],
  defaultVolume = 0.7,
  autoPlay = true,
  className = "",
}) {
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() =>
    Number(localStorage.getItem("scVolume") ?? defaultVolume)
  );
  const [ready, setReady] = useState(false);

  const tracks = useMemo(() => playlist.filter(Boolean), [playlist]);

  // Ensure SC Widget API
  useEffect(() => {
    if (window.SC && window.SC.Widget) return;
    const existing = document.querySelector(`script[src='${API_SRC}']`);
    if (existing) return; // will be available soon
    const s = document.createElement("script");
    s.src = API_SRC;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  // Init widget once API is present
  useEffect(() => {
    let mounted = true;
    const init = () => {
      if (!iframeRef.current || !window.SC || !window.SC.Widget) return;
      const widget = window.SC.Widget(iframeRef.current);
      widgetRef.current = widget;

      widget.bind(window.SC.Widget.Events.READY, () => {
        if (!mounted) return;
        setReady(true);
        widget.setVolume(Math.round(Math.max(0, Math.min(1, volume)) * 100));
        if (autoPlay) {
          try {
            widget.play();
          } catch {}
        }
      });
      widget.bind(window.SC.Widget.Events.PLAY, () => setIsPlaying(true));
      widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));
      widget.bind(window.SC.Widget.Events.FINISH, () => next());
    };

    const t = setInterval(() => {
      if (window.SC && window.SC.Widget && iframeRef.current) {
        clearInterval(t);
        init();
      }
    }, 50);

    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, [autoPlay, volume]);

  // Load current track when index changes
  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget || !tracks[index]) return;
    widget.load(tracks[index], {
      auto_play: autoPlay,
      show_artwork: false,
      visual: false,
      buying: false,
      sharing: false,
      download: false,
      show_user: false,
      hide_related: true,
      show_reposts: false,
      show_teaser: false,
    });
    // Re-apply volume after load
    setTimeout(() => {
      try {
        widget.setVolume(Math.round(Math.max(0, Math.min(1, volume)) * 100));
      } catch {}
    }, 300);
  }, [index, tracks, autoPlay, volume]);

  // Persist and apply volume
  useEffect(() => {
    localStorage.setItem("scVolume", String(volume));
    try {
      widgetRef.current?.setVolume(
        Math.round(Math.max(0, Math.min(1, volume)) * 100)
      );
    } catch {}
  }, [volume]);

  // Resume on first gesture if blocked
  useEffect(() => {
    const resume = () => {
      try {
        if (ready && !isPlaying) widgetRef.current?.play();
      } catch {}
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
      window.removeEventListener("touchstart", resume);
    };
    window.addEventListener("pointerdown", resume, { passive: true });
    window.addEventListener("keydown", resume);
    window.addEventListener("touchstart", resume, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
      window.removeEventListener("touchstart", resume);
    };
  }, [ready, isPlaying]);

  const playPause = () => {
    if (!widgetRef.current) return;
    if (isPlaying) widgetRef.current.pause();
    else widgetRef.current.play();
  };

  const next = () => setIndex((i) => (i + 1) % tracks.length);
  const prev = () => setIndex((i) => (i - 1 + tracks.length) % tracks.length);

  const currentUrl = tracks[index] || "";

  return (
    <div
      className={
        "fixed bottom-4 right-4 z-50 rounded-xl border border-white/10 bg-white/5 backdrop-blur p-3 shadow-lg text-slate-100 " +
        className
      }
    >
      {/* Hidden SoundCloud iframe */}
      <iframe
        ref={iframeRef}
        title="SoundCloud Player"
        allow="autoplay"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
        src={`${WIDGET_SRC}${encodeURIComponent(currentUrl)}&auto_play=${
          autoPlay ? "true" : "false"
        }&visual=false`}
      />

      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
          aria-label="Previous"
        >
          ◀
        </button>
        <button
          onClick={playPause}
          className="px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={next}
          className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
          aria-label="Next"
        >
          ▶
        </button>
        <div className="ml-2 min-w-[140px]">
          <div className="text-[10px] leading-tight text-slate-300 truncate">
            {decodeURIComponent(currentUrl.split("/").pop() || "").split(
              "?"
            )[0] || "-"}
          </div>
          <div className="text-[10px] leading-tight text-slate-400 truncate">
            SoundCloud
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-[10px] text-slate-400">Vol</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-32"
          aria-label="Volume"
        />
        <span className="text-[10px] text-slate-400 w-6 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
}
