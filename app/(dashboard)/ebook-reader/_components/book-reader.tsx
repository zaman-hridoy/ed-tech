"use client";

import { useEffect, useState } from "react";

interface Props {
  xmlData: string;
}

const BookReader = ({ xmlData }: Props) => {
  const [readAccessUrl, setReadAccessUrl] = useState("");

  useEffect(() => {
    if (xmlData) {
      const xmlDoc = new DOMParser().parseFromString(xmlData, "text/xml");
      const redirect = xmlDoc.getElementsByTagName("redirect");

      if (redirect.length > 0) {
        const read_url = redirect[0].getAttribute("auto-signin");

        if (read_url) {
          setReadAccessUrl(read_url);
        }
      }
    }
  }, [xmlData]);

  return (
    <div>
      <iframe
        src={readAccessUrl}
        style={{ width: "100%", height: "100vh", border: 0, minHeight: 700 }}
      ></iframe>
    </div>
  );
};

export default BookReader;
