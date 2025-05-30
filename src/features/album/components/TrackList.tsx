"use client";

import { ExplicitBadge } from "@/components/ExplicitBadge";
import { SpotifyAlbum } from "@/types/spotify";
import { getSafeImageUrl } from "@/utils/image";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface TrackListProps {
  album: SpotifyAlbum;
}

export const TrackList = ({ album }: TrackListProps) => {
  const albumImage = getSafeImageUrl(album.images, "sm");

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-card-bg rounded-lg py-5"
    >
      <h2 className="text-lg font-bold mb-4">트랙 목록</h2>
      <div>
        <div className="flex items-center gap-2 py-2 text-text-secondary text-sm">
          <div className="w-8 text-center shrink-0">#</div>
          <div className="flex-grow min-w-0">제목</div>
          <div className="hidden md:block w-1/4 min-w-0">아티스트</div>
          <div className="text-right w-10 shrink-0">시간</div>
        </div>
        {album.tracks?.items.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center gap-2 py-2 hover:bg-gray-700/10 transition-colors group"
          >
            <div className="w-8 text-center text-text-secondary shrink-0">
              <span>{index + 1}</span>
            </div>
            <div className="w-10 h-10 shrink-0">
              <Image
                src={albumImage}
                alt={album.name}
                width={40}
                height={40}
                className="rounded-md"
              />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-1">
                <Link
                  href={`/track/${track.id}`}
                  className="hover:text-primary line-clamp-2"
                >
                  {track.name}
                </Link>
                {track.explicit && <ExplicitBadge />}
              </div>
            </div>
            <div className="hidden md:block w-1/4 min-w-0">
              <div className="text-text-secondary truncate">
                {track.artists.map((artist, index) => (
                  <Fragment key={artist.id}>
                    <Link
                      href={`/artist/${artist.id}`}
                      className="hover:text-primary"
                    >
                      {artist.name}
                    </Link>
                    {index < track.artists.length - 1 && (
                      <span className="mx-1">, </span>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="text-text-secondary text-right w-10 shrink-0 monospace-nums">
              {Math.floor(track.duration_ms / 60000)}:
              {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
