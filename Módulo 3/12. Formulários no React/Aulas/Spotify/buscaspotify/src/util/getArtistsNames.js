export default function getArtistsNames(artists) {
  const artistsName = artists.map((artist) => artist.name);
  return artistsName.join(",");
}
