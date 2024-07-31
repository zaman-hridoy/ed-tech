import { authOptions } from "@/lib/auth";
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { getServerSession } from "next-auth";

type FuctionType = (folderId?: number) => Promise<TreeNodeType[]>;

export const getDriveRecentFiles: FuctionType = async (folderId) => {
  const session: SessionWithUserType | null = await getServerSession(
    authOptions
  );

  let results: TreeNodeType[] = [];

  try {
    const res = await axios.post(
      `/dam/file-service/get-recently-viewed-assets`,
      {
        user_id: session?.user?.userId,
      }
    );
    if (res.data && res.data?.length > 0) {
      results = res.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        type: "FILE",
        parentFolderId: item.folder_id,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        data: item,
      }));
    }
  } catch (error) {
    console.log(error);
  } finally {
    return results;
  }
};
