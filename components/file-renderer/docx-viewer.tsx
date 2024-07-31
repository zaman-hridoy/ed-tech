interface Props {
  url: string;
}

const DocxViewer = ({ url }: Props) => {
  return (
    <div className="w-full h-full">
      <iframe
        src={`https://docs.google.com/gview?url=${url}&embedded=true`}
        // src={docURL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
      >
        <div
          className="flex align-items-center justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="flex align-items-center">
            <p style={{ fontSize: "22px" }}>Failed to view </p>
          </div>
        </div>
      </iframe>
    </div>
  );
};

export default DocxViewer;
