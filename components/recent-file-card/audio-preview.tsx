import { CourseFileType } from "@/lib/types";
import { FileAudioIcon } from "lucide-react";

interface Props {
  file: CourseFileType;
}

const AudioPreview = ({ file }: Props) => {
  // const { data } = useSession();
  // const session = data as SessionWithUserType | null;
  // const [preview, setPreview] = useState<string>("");

  // useEffect(() => {
  //   if (file.from === "MY_DRIVE") {
  //     axios
  //       .post("/dam/file-service/get-link", {
  //         path: file?.url,
  //         user_id: session?.user?.userId,
  //       })
  //       .then((res) => {
  //         if (res.data && res.data !== "error") {
  //           setPreview(res.data);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else if (file.preview) {
  //     setPreview(file?.preview);
  //   }
  // }, [file, session]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-rose-500">
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          <FileAudioIcon className="w-10 h-10 text-white" />
        </div>
      </div>
    </div>
  );
};

export default AudioPreview;
