"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, Volume2 } from "lucide-react";
import { useMobile } from "../hooks/useMobile";

/**
 * Props para el componente AudioPlayer.
 * @param audios - Arreglo de URLs de archivos de audio a reproducir en secuencia.
 */
interface AudioPlayerProps {
   audios: string[];
   isPlaying: boolean;
   setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Componente de reproducción de audio con control de volumen.
 */
export default function AudioPlayer({
   audios,
   isPlaying,
   setIsPlaying,
}: AudioPlayerProps) {
   // const [isPlaying, setIsPlaying] = useState(false);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [volume, setVolume] = useState(0.3); // Estado de volumen
   const audioRef = useRef<HTMLAudioElement | null>(null);
   const isMobile = useMobile();

   useEffect(() => {
      if (!audios.length) return;

      const newAudio = new Audio(audios[currentIndex]);
      newAudio.volume = volume;

      const handleEnded = () => {
         const nextIndex = (currentIndex + 1) % audios.length;
         setCurrentIndex(nextIndex);
      };

      newAudio.addEventListener("ended", handleEnded);
      audioRef.current = newAudio;

      if (isPlaying) {
         newAudio.play().catch(console.error);
      }

      return () => {
         newAudio.pause();
         newAudio.removeEventListener("ended", handleEnded);
         audioRef.current = null;
      };
   }, [currentIndex, audios]);

   useEffect(() => {
      if (audioRef.current) {
         audioRef.current.volume = volume;
      }
   }, [volume]);

   useEffect(() => {
      if (isPlaying && audioRef.current) {
         audioRef.current.play().catch(console.error);
      } else if (audioRef.current) {
         audioRef.current.pause();
      }
   }, [isPlaying]);

   const togglePlay = () => {
      setIsPlaying((prev) => !prev);
   };

   return (
      <div className="flex items-center gap-4">
         <div
            className="tooltip tooltip-bottom"
            data-tip={isPlaying ? "Mutear música" : "Reproducir música"}>
            <button
               className={`btn ${isMobile ? "btn-xs" : "btn-md"} ${
                  isPlaying ? "btn-circle" : ""
               } rounded-full btn-primary backdrop-blur-sm transition-all hover:scale-105 `}
               onClick={togglePlay}
               aria-label={isPlaying ? "Mutear música" : "Reproducir música"}>
               {isPlaying ? (
                  <Volume2 className={isMobile ? "h-3 w-3" : "h-5 w-5"} />
               ) : (
                  <>
                     <Heart
                        className={`text-primary-content ${
                           isMobile ? "h-3 w-3" : "h-4 w-4"
                        } animate-pulse`}
                        fill="currentColor"
                     />{" "}
                     Reproducir música
                  </>
                  // <>💗 Reproducir música</>
               )}
            </button>
         </div>
         {/* Control de Volumen */}
         {isPlaying && (
            <div className="flex items-center gap-2 w-full max-w-xs">
               <span className="text-sm">🔉</span>
               <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="range range-primary range-xs flex-1"
               />
               <span className="text-sm">🔊</span>
            </div>
         )}
      </div>
   );
}
