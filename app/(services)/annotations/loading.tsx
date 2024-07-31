import { Loader2 } from "lucide-react";

const AnnotationLoadingPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <h1 className="text-2xl text-black flex items-center gap-x-2">
        <Loader2 /> Initializing...
      </h1>
    </div>
  );
};

export default AnnotationLoadingPage;
