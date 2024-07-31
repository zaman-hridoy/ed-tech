import { authOptions } from "@/lib/auth";
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { getServerSession } from "next-auth";

type FuctionType = (folderId?: number) => Promise<TreeNodeType[]>;

export const getExamFolders: FuctionType = async (folderId) => {
  const session: SessionWithUserType | null = await getServerSession(
    authOptions
  );

  let results: TreeNodeType[] = [];

  try {
    const payload = {
      student_id: session?.user?.userId,
      parent_id: folderId || null,
    };

    const folderRes = await axios.post("/content/ExamLibraryList", payload, {
      headers: {
        Authorization: session?.user?.accessToken,
      },
    });
    results = folderRes.data?.status?.map((item: any) => ({
      id: item.id,
      name: item.name,
      type: "FOLDER",
      parentFolderId: null,
      createdAt: item.created_date,
      updatedAt: item.created_date,
      data: item,
    }));
  } catch (error) {
    console.log(error);
  } finally {
    return results;
  }
};
