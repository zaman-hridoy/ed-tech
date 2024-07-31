"use client";

import { Separator } from "@/components/ui/separator";
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ExamFolderNode from "./exam-folder-node";

const ExamLibraryTree = () => {
  const { data } = useSession();
  const session = data as SessionWithUserType;
  const folderState = useQuery({
    queryKey: ["exam-parent-folders"],
    queryFn: () =>
      axios
        .post(
          "/content/ExamLibraryList",
          {
            student_id: session.user?.userId,
            parent_id: null,
          },
          {
            headers: {
              Authorization: session.user?.accessToken,
            },
          }
        )
        .then((res) => {
          const list: TreeNodeType[] = res.data?.status?.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: "FOLDER",
            parentFolderId: null,
            createdAt: item.created_date,
            updatedAt: item.created_date,
            data: item,
          }));
          return list;
        }),
    enabled: !!session?.user?.userId,
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-x-2 text-sm font-semibold tracking-tight w-full text-slate-500 hover:text-[var(--brand-color)]">
        <svg
          width="15"
          height="16"
          viewBox="0 0 13 14"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.4078 5.733C11.8883 5.64189 11.3613 5.59737 10.8333 5.6C10.53 5.6 10.2339 5.6 9.9378 5.656C9.56916 5.17921 9.09862 4.78523 8.55837 4.501C9.02242 4.00978 9.28005 3.36804 9.28058 2.702C9.28058 1.98539 8.98687 1.29812 8.46407 0.791397C7.94126 0.284674 7.23218 0 6.49283 0C5.75347 0 5.04439 0.284674 4.52158 0.791397C3.99878 1.29812 3.70507 1.98539 3.70507 2.702C3.7056 3.36804 3.96323 4.00978 4.42729 4.501C3.89024 4.78671 3.42046 5.17767 3.04785 5.649C2.76619 5.6 2.47008 5.6 2.16675 5.6C1.63839 5.60199 1.11135 5.6512 0.592314 5.747C0.424068 5.77682 0.2722 5.86354 0.16375 5.99173C0.0552998 6.11992 -0.00269329 6.28125 9.61342e-05 6.447V12.222C-7.61739e-05 12.3248 0.0231313 12.4264 0.0680685 12.5196C0.113006 12.6128 0.178568 12.6952 0.260094 12.761C0.341106 12.8272 0.436157 12.8753 0.538504 12.9019C0.640851 12.9286 0.747987 12.933 0.852312 12.915C1.28449 12.8238 1.72458 12.7722 2.16675 12.761C3.56575 12.7595 4.9344 13.1563 6.10283 13.902L6.19672 13.937C6.29252 13.9773 6.39563 13.9987 6.50005 14C6.56898 13.9992 6.6373 13.9873 6.70227 13.965H6.75282L6.84671 13.93C8.02626 13.1651 9.41416 12.7581 10.8333 12.761C11.2746 12.763 11.7147 12.8052 12.1478 12.887C12.2521 12.905 12.3592 12.9006 12.4616 12.8739C12.5639 12.8473 12.659 12.7992 12.74 12.733C12.8215 12.6672 12.8871 12.5848 12.932 12.4916C12.977 12.3984 13.0002 12.2968 13 12.194V6.419C12.9994 6.25565 12.9398 6.09764 12.8317 5.97236C12.7235 5.84708 12.5736 5.7624 12.4078 5.733ZM6.50005 1.4C6.83837 1.42409 7.15476 1.57136 7.38567 1.81222C7.61659 2.05308 7.74494 2.3697 7.74494 2.6985C7.74494 3.0273 7.61659 3.34392 7.38567 3.58478C7.15476 3.82564 6.83837 3.97291 6.50005 3.997C6.16173 3.97291 5.84534 3.82564 5.61442 3.58478C5.3835 3.34392 5.25516 3.0273 5.25516 2.6985C5.25516 2.3697 5.3835 2.05308 5.61442 1.81222C5.84534 1.57136 6.16173 1.42409 6.50005 1.4ZM5.77783 12.131C4.64588 11.6239 3.41377 11.3611 2.16675 11.361C1.92842 11.361 1.69008 11.361 1.44453 11.396V7C2.05015 6.93433 2.66206 6.9461 3.26452 7.035H3.34396C4.20455 7.1883 5.02924 7.4919 5.77783 7.931V12.131ZM6.50005 6.72C6.17889 6.54044 5.84596 6.38143 5.50339 6.244H5.46006C5.22172 6.153 4.98339 6.062 4.73784 5.992C5.23928 5.60516 5.85921 5.39092 6.50005 5.383C7.13919 5.38693 7.75894 5.59618 8.26226 5.978C7.64916 6.16352 7.05837 6.41228 6.50005 6.72ZM11.5556 11.396C10.0726 11.2516 8.57674 11.4932 7.22226 12.096V7.896C7.97221 7.46816 8.79741 7.17861 9.65614 7.042H9.80058C10.3812 6.95436 10.9712 6.94024 11.5556 7V11.396Z"
            fill="currentColor"
          ></path>
        </svg>
        <Link href="/exam-library" className="text-inherit hover:underline">
          Exam library
        </Link>
      </div>
      <Separator className="my-2 w-full" />
      <div className="flex flex-col">
        {folderState.data &&
          folderState.data.map((folder) => (
            <ExamFolderNode
              key={folder.id}
              {...folder}
              pageType="exam-library"
            />
          ))}
      </div>
    </div>
  );
};

export default ExamLibraryTree;
