import { Profile } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { db } from "./db";

export const getChatProfile = async () => {
  const session = await getServerSession(authOptions);
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
