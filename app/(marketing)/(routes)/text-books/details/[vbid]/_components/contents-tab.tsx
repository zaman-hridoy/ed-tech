"use client";

import { Button } from "@/components/ui/button";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props {
  vbid: string;
}

const ContentsTab = ({ vbid }: Props) => {
  const contentState = useQuery({
    queryKey: [`table_contents_${vbid}`],
    queryFn: () => {
      return axios
        .post("/content/vs/getTableOfContents", {
          vbid: vbid,
        })
        .then((res) => {
          if (res.data && res.data?.table_of_contents) {
            return res.data?.table_of_contents;
          } else {
            return [];
          }
        });
    },
  });

  const [contentList, setContentList] = useState<any[]>([]);

  useEffect(() => {
    if (contentState.data && contentState.data?.length > 0) {
      setContentList(contentState.data?.slice(0, 20));
    }
  }, [contentState.data]);
  return (
    <div>
      <ul className="mt-4">
        {contentList &&
          contentList?.map((item: any) => (
            <li key={item?.title}>{item?.title}</li>
          ))}
        {contentState.data &&
          contentState?.data?.length > 20 &&
          contentState?.data?.length !== contentList?.length && (
            <li style={{ listStyle: "none", paddingTop: 20 }}>
              <Button
                onClick={() => setContentList(contentState?.data)}
                variant="primary"
              >
                View more...
              </Button>
            </li>
          )}
        {contentState.data &&
          contentState?.data?.length > 20 &&
          contentState?.data?.length === contentList?.length && (
            <li style={{ listStyle: "none", paddingTop: 20 }}>
              <Button
                onClick={() => setContentList(contentState?.data?.slice(0, 20))}
                variant="primary"
              >
                View less...
              </Button>
            </li>
          )}
      </ul>
    </div>
  );
};

export default ContentsTab;
