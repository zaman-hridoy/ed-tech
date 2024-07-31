import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const speechKey = process.env.SPEECH_KEY;
  const speechRegion = process.env.SPEECH_REGION;
  if (!speechKey || !speechRegion) {
    return NextResponse.json(
      "You forgot to add your speech key or region to the .env file.",
      {
        status: 400,
      }
    );
  }

  console.log({ speechKey, speechRegion });

  const headers = {
    headers: {
      "Ocp-Apim-Subscription-Key": speechKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const tokenResponse = await axios.post(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      null,
      headers
    );
    return NextResponse.json({
      token: tokenResponse.data,
      region: speechRegion,
    });
  } catch (err: any) {
    console.log(err.response);
    return NextResponse.json(
      "There was an error authorizing your speech key.",
      { status: 401 }
    );
  }
}
