import React from "react";
import getAlbumCover from "../util/getAlbumCover";
import getArtistsNames from "../util/getArtistsNames";

function Card({ track }) {
  const { name, album, external_urls, artists } = track;
  console.log(getAlbumCover);
  return (
    <div className="card">
      <a href={external_urls.spotify}>
        <img src={getAlbumCover(album)} alt={`${name} album cover`}></img>
      </a>
      <b>{name}</b> - {getArtistsNames(artists)}
    </div>
  );
}

export default Card;
