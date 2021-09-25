const CLIENT_ID = "8d097a474fc749c08c007654d4611332";
const CLIENT_SECRET = "39c9f6860e74481eb22c36f3cbf92f2c"; // Resetado

const baseURL = (id, secret) =>
  `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${id}&client_secret=${secret}`;

export default async function getSpotifyToken() {
  try {
    const response = await fetch(baseURL(CLIENT_ID, CLIENT_SECRET), {
      method: "POST",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
    });
    const {access_token, token_type} = await response.json();
    return `${token_type} ${access_token}`;
  } catch (erro) {
    console.log(erro);
    throw erro;
  }
}
