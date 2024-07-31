"use client";

import { Button } from "@/components/ui/button";
import axios from "@/lib/instance";
import { SessionWithUserType } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

type BreadCrumb = {
  id: string;
  name: string;
};

interface Props {
  folderId?: string;
}

const ExamBreadcrumb = ({ folderId }: Props) => {
  const { data } = useSession();
  const session = data as SessionWithUserType;
  const [breadcrumbList, setBreadcrumbList] = useState<BreadCrumb[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (folderId) {
      setLoading(true);
      axios
        .post(
          `/content/getBreadCrumbs`,
          {
            library_id: folderId,
          },
          {
            headers: {
              Authorization: session?.user?.accessToken,
            },
          }
        )
        .then((res) => {
          const list = res.data?.status?.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
          setBreadcrumbList(list);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [folderId, session]);

  const renderActionMenuBtn = ({
    link,
    label,
    folderId,
  }: {
    link: string;
    label: string;
    folderId?: number;
  }) => {
    return (
      <Button
        disabled={loading}
        className="w-auto h-auto px-2 py-1 rounded-full font-semibold text-slate-600 bg-transparent hover:bg-slate-200 gap-x-1"
      >
        <Link href={link} className="text-sm lg:text-base">
          {label}
        </Link>
      </Button>
    );
  };

  return (
    <div className="flex items-center flex-wrap gap-2">
      {renderActionMenuBtn({
        link: "/shared-by",
        label: "Shared Library",
      })}

      {breadcrumbList.map((item, idx) => (
        <Fragment key={item.id}>
          <ChevronRight className="w-4 h-4 text-inherit" />
          {renderActionMenuBtn({
            link: `/shared-by/${item.id}`,
            label: item.name,
            folderId: +item.id,
          })}
        </Fragment>
      ))}
    </div>
  );
};

export default ExamBreadcrumb;
