import { authOptions } from "@/lib/auth";
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { getServerSession } from "next-auth";

type FuctionType = (folderId?: number) => Promise<TreeNodeType[]>;

type PayloadType = {
  id?: number;
  user_id?: number;
};

export const getDriveFolders: FuctionType = async (folderId) => {
  const session: SessionWithUserType | null = await getServerSession(
    authOptions
  );

  let results: TreeNodeType[] = [];

  try {
    const api = folderId
      ? "/dam/folder-service/subfolder-list"
      : "/dam/folder-service/list";
    const payload: PayloadType = {
      user_id: session?.user?.userId,
    };
    if (folderId) {
      payload.id = folderId;
    }
    const folderRes = await axios.post(api, payload);
    if (folderRes.data && folderRes.data?.length > 0) {
      results = folderRes.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        type: "FOLDER",
        parentFolderId: item?.parent_folder_id || null,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        data: null,
      }));
    }
  } catch (error) {
    console.log(error);
  } finally {
    return results;
  }
};
