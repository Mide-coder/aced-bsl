"use client";
// ACED — TeachingClipPlayer
// 2-minute teaching clip player — screen + voice, no face

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Clock } from "lucide-react";

interface TeachingClipPlayerProps {
  videoUrl?: string;
  tutorName: string;
  subject?: string;
  duration?: string;
}

export function TeachingClipPlayer({
  videoUrl,
  tutorName,
  subject,
  duration = "1:45",
}: TeachingClipPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (playing) {
      progressInterval.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 0;
          }
          return p + 0.5;
        });
      }, 100);
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [playing]);

  const currentTime = Math.floor((progress / 100) * 105);
  const mins = Math.floor(currentTime / 60);
  const secs = currentTime % 60;

  return (
    <div className="bg-aced-text rounded-[var(--radius-aced-lg)] overflow-hidden space-y-0">
      {/* Video area */}
      <div className="relative aspect-video bg-gradient-to-br from-aced-text via-gray-900 to-aced-text flex items-center justify-center cursor-pointer group"
        onClick={() => setPlaying(!playing)}
      >
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:bg-black/40">
          {!playing ? (
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <Pause size={28} className="text-white" />
            </div>
          )}
        </div>

        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Clock size={11} />
          {duration}
        </div>

        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white/70 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          🎙️ Voice + Screen
        </div>
      </div>

      {/* Controls bar */}
      <div className="bg-gray-900 px-4 py-3 space-y-2">
        <div className="relative h-1.5 bg-gray-700 rounded-full cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setProgress((x / rect.width) * 100);
          }}
        >
          <div
            className="absolute h-full bg-gradient-to-r from-aced-royal to-aced-blue rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute w-3 h-3 bg-white rounded-full shadow -top-[4px] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); setPlaying(!playing); }}
              className="text-white hover:text-aced-blue transition-colors"
            >
              {playing ? <Pause size={18} /> : <Play size={18} fill="white" />}
            </button>
            <span className="text-xs text-white/50 font-mono">
              {mins}:{secs.toString().padStart(2, "0")} / {duration}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
              className="text-white/50 hover:text-white transition-colors"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button className="text-white/50 hover:text-white transition-colors">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 px-4 pb-3 pt-0">
        <p className="text-xs text-white/40">
          📹 {tutorName}{subject ? ` teaching ${subject}` : ""} — voice + screen, no face
        </p>
      </div>
    </div>
  );
}
