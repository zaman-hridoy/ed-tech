import axios from "axios";
// @ts-ignore
import Cookie from "universal-cookie";

export async function getTokenOrRefresh() {
  const cookie = new Cookie();
  const speechToken = cookie.get("speech-token");

  if (speechToken === undefined) {
    try {
      const res = await axios.get("/api/get-speech-token");
      const token = res.data.token;
      const region = res.data.region;
      cookie.set("speech-token", region + ":" + token, {
        maxAge: 540,
        path: "/",
      });
      console.log("Token fetched from back-end: " + token);
      return { authToken: token, region: region };
    } catch (error: any) {
      console.log(error);
      return { authToken: null, error: error?.response?.data };
    }
  } else {
    console.log("Token fetched from cookie: " + speechToken);
    const idx = speechToken.indexOf(":");
    return {
      authToken: speechToken.slice(idx + 1),
      region: speechToken.slice(0, idx),
    };
  }
}
