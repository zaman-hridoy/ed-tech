import { authOptions } from "@/lib/auth";
import axios from "@/lib/instance";
import { SessionWithUserType } from "@/lib/types";
import { getServerSession } from "next-auth";

export const addCollectionViews = async (collectionId: number) => {
  const session: SessionWithUserType | null = await getServerSession(
    authOptions
  );

  if (!session) return;

  try {
    await axios.post(
      `/content/addContentViews`,
      { course_collection_id: collectionId },
      {
        headers: {
          Authorization: `${session?.user?.accessToken}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
