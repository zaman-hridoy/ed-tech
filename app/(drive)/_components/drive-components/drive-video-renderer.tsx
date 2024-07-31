"use client";

import axios from "@/lib/instance";
import { SessionWithUserType } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface Props {
  assetUrl: string;
}

const DriveVideoRenderer = ({ assetUrl }: Props) => {
  const { data } = useSession();
  const session = data as SessionWithUserType;
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .post("/dam/file-service/get-link", {
        path: assetUrl,
        user_id: session?.user?.userId,
      })
      .then((res) => {
        if (res.data && res.data !== "error") {
          setPreviewUrl(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [assetUrl, session]);

  return (
    <div className="relative w-full h-full">
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <Fragment>
          {previewUrl && (
            <ReactPlayer url={previewUrl} width={"100%"} height={"100%"} />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default DriveVideoRenderer;
