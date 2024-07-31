"use client";

import axios from "@/lib/instance";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type BookMetadataType = {
  description: string;
  subjects: string[];
  loading: boolean;
};

interface Props {
  vbid: string;
}

const BookDetailsTab = ({ vbid }: Props) => {
  const [bookMetadata, setBookMetadata] = useState<BookMetadataType>({
    description: "",
    subjects: [],
    loading: false,
  });

  useEffect(() => {
    if (vbid) {
      setBookMetadata((prev) => ({ ...prev, loading: true }));
      axios
        .post(`/content/getBookPublisherInformation`, {
          vbid: vbid,
        })
        .then((res) => {
          setBookMetadata((prev) => ({ ...prev, loading: false }));
          if (res.data && res.data?.fullUserResponse) {
            const xmlDoc = new DOMParser().parseFromString(
              res.data?.fullUserResponse,
              "text/xml"
            );
            const description = xmlDoc.getElementsByTagName("description");
            const subject_list = xmlDoc.getElementsByTagName("subject");

            const subjects: string[] = [];
            for (let i = 0; i < subject_list.length; i++) {
              const element = subject_list[i];
              const isValid =
                element?.innerHTML?.includes("&amp") ||
                element?.innerHTML?.includes("-&gt");
              if (!subjects.find((s) => s === element.innerHTML) && !isValid) {
                subjects.push(element.innerHTML);
              }
            }

            setBookMetadata((prev) => ({
              ...prev,
              description: description[0]?.textContent || "",
              subjects,
            }));
          }
        })
        .catch((err) => {
          setBookMetadata((prev) => ({ ...prev, loading: false }));
          console.log(err);
        });
    }
  }, [vbid]);

  if (bookMetadata.loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin w-10 h-10 text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p className="text-sm lg:text-base text-zinc-500">
          {bookMetadata?.description}
        </p>
      </div>
      <div>
        <p className="text-base italic text-zinc-500">
          This is a digital product.
        </p>

        <div className="flex flex-col mt-6">
          <h4 className="text-sm lg:text-base font-semibold text-zinc-700">
            Subjects
          </h4>
          {bookMetadata?.subjects?.map((subject) => (
            <Link
              key={subject}
              href={`/text-books/${encodeURIComponent(subject)}`}
              className="text-sm lg:text-base text-[var(--brand-color)] underline"
            >
              {subject}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsTab;
