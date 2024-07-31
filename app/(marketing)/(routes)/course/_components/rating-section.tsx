import RatingInput from "@/components/rating-input";
import axios from "@/lib/instance";

interface Props {
  collectionId: number;
}

const RatingSection = async ({ collectionId }: Props) => {
  //   const [rating, setRating] = useState<number>(0);
  let rating = 0;
  try {
    const res = await axios.post(`/content/getCourseCollectionRatingPublic`, {
      course_collection_id: collectionId,
    });
    if (res.data?.data && res.data?.data?.rating) {
      rating = +res.data?.data?.rating;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col w-[200px] items-end justify-end">
      <span className="text-xs text-slate-400 font-semibold">Rating</span>
      <RatingInput value={rating} readonly size={100} />
    </div>
  );
};

export default RatingSection;
