import axios from "@/lib/instance";

interface Props {
  collectionId: number;
}

const ViewsSection = async ({ collectionId }: Props) => {
  // const [views, setViews] = useState<number>(0);

  let views = 0;

  try {
    const res = await axios.post(
      `/content/getCourseCollectionContentViewPublic`,
      {
        course_collection_id: collectionId,
      }
    );
    if (res.data?.data && res.data?.data?.total) {
      views = +res.data?.data?.total;
    }
  } catch (error) {
    console.log(error);
  }

  // const addViews = useCallback(async () => {
  //   try {
  //     if (session) {
  //       await axios.post(
  //         `/content/addContentViews`,
  //         { course_collection_id: collectionId },
  //         {
  //           headers: {
  //             Authorization: `${session?.user?.accessToken}`,
  //           },
  //         }
  //       );
  //       await getViews();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [collectionId, session, getViews]);

  // useEffect(() => {
  //   getViews();
  // }, []);

  return (
    <div className="flex flex-col w-[200px] items-end justify-end">
      <span className="text-xs text-slate-400 font-semibold">
        Collection Views
      </span>
      <span className="text-sm text-slate-900 font-semibold">{views}</span>
    </div>
  );
};

export default ViewsSection;
