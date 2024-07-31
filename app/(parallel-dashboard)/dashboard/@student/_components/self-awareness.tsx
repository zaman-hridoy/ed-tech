import CourseSectionTitle from "@/components/course-section-title";
import bg_mobile from "@/public/images/self-awareness/bg-mobile.png";
import Image from "next/image";
import AwarenessItem from "./awareness-item";

const SelfAwareness = () => {
  return (
    <div className="space-y-4">
      <CourseSectionTitle
        title="Self Awareness / Study Skills"
        iconType="awareness"
      />

      <div className="relative w-full h-auto rounded-md overflow-hidden">
        <Image
          src={bg_mobile}
          alt="awareness"
          fill
          priority
          className="object-cover"
        />
        <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-full gap-4 p-4">
          <div className="w-full text-center md:text-left md:w-1/2">
            <p className="shrink-0 text-xl text-white font-semibold tracking-tight">
              Resources to improve performance, <br /> manage stress and
              increase effectiveness.
            </p>
          </div>
          <div className="flex items-center justify-end gap-2 h-full">
            <AwarenessItem
              url="https://www.youtube.com/watch?v=SL_Q_aTfyvQ"
              title="How to Manage Stress for College Students!"
            />
            <AwarenessItem
              url="https://www.youtube.com/watch?v=vO1bpod0vKM"
              title="7 Daily Habits of High Performance Students"
            />
            <AwarenessItem
              url="https://www.youtube.com/watch?v=z6X5oEIg6Ak"
              title="10-Minute Meditation For Stress"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAwareness;
