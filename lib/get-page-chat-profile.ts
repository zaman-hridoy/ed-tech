import { Profile } from "@prisma/client";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { db } from "./db";
import { NextApiResponseWithServerIO } from "./types";

export const getPageChatProfile = async (
  req: NextApiRequest,
  res: NextApiResponseWithServerIO
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return null;

  let profile: Profile | null = null;
  try {
    profile = await db.profile.findUnique({
      where: {
        userId: session.user.userId,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return profile;
  }
};
