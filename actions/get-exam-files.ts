import { authOptions } from "@/lib/auth";
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { getServerSession } from "next-auth";

type FuctionType = (folderId?: number) => Promise<TreeNodeType[]>;

export const getExamFiles: FuctionType = async (folderId) => {
  const session: SessionWithUserType | null = await getServerSession(
    authOptions
  );

  let results: TreeNodeType[] = [];

  try {
    const payload = {
      student_id: session?.user?.userId,
      exam_library_id: folderId || null,
    };

    const res = await axios.post("/content/ExamLibraryContentList", payload, {
      headers: {
        Authorization: session?.user?.accessToken,
      },
    });
    results = res.data?.status?.map((item: any) => {
      const content = JSON.parse(item?.content);
      return {
        id: item.id,
        name: content.title || "no-filename",
        type: "FILE",
        parentFolderId: null,
        createdAt: item.created_date,
        updatedAt: item.created_date,
        data: content,
      };
    });
  } catch (error) {
    console.log(error);
  } finally {
    return results;
  }
};
