import { authOptions } from "@/lib/auth";
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { getServerSession } from "next-auth";

type FuctionType = () => Promise<TreeNodeType[]>;

export const getSharedByFolders: FuctionType = async () => {
  const session: SessionWithUserType | null = await getServerSession(
    authOptions
  );

  let results: TreeNodeType[] = [];

  try {
    const payload = {
      sender_student_id: session?.user?.userId,
    };

    const folderRes = await axios.post(
      "/content/getshareExamLibraryByMe",
      payload,
      {
        headers: {
          Authorization: session?.user?.accessToken,
        },
      }
    );
    results = folderRes.data?.status?.map((item: any) => ({
      id: item.library_id,
      name: item.examlibrary_name,
      type: "FOLDER",
      parentFolderId: null,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      data: item,
    }));
  } catch (error) {
    console.log(error);
  } finally {
    return results;
  }
};
