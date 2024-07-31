import Container from "@/components/container";
import VideoPlayer from "@/components/video-player";
import annotations from "@/public/pages/student/annotations.png";
import banner_img from "@/public/pages/student/banner.webp";
import dam_img from "@/public/pages/student/course_module.png";
import exam_library from "@/public/pages/student/exam_library.png";
import earner_echosystem from "@/public/pages/student/learner-echosystem.webp";
import my_drive from "@/public/pages/student/my_drive.png";
import relevant_content from "@/public/pages/student/relevant-content.webp";
import smart_recommendations from "@/public/pages/student/smart_recommendations.png";
import user_preference from "@/public/pages/student/user-preference.png";
import video_session from "@/public/pages/student/video_session.png";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageTitle from "../../_components/page-title";
import SectionTitle from "../../_components/section-title";
import SubSectionTitle from "../../_components/sub-section-title";

const StudentPage = () => {
  return (
    <div>
      <section className="pb-14">
        <Image
          src={banner_img}
          alt="Solution for students"
          priority
          className="h-64 object-cover md:object-contain md:h-auto"
        />
        <div className="space-y-4 max-w-4xl mx-auto px-4 lg:px-5 pt-14">
          <PageTitle title="The SimpliTaught Solution for" />

          <h2 className="text-slate-800 font-bold text-6xl lg:text-9xl tracking-tight text-center">
            Students
          </h2>

          <p className="text-sm lg:text-xl text-slate-800 font-medium text-center">
            College students are reported to understand as little as 20% of
            their textbooks in a traditional learning environment. SimpliTaught
            bridges the comprehension gap by providing additional digital
            resources and learning tools to support course material down to each
            specific chapter.
          </p>
        </div>

        <Container>
          <VideoPlayer src="https://www.youtube.com/watch?v=PR_6eF46qkY&t=7s" />
        </Container>
      </section>

      {/* section 1 */}
      <section className="bg-white py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <SectionTitle title="Efficient, Effective Searches For Relevant Content By Courses" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                The SimpliTaught platform presents digital assets selected by
                the institution and/or instructor as the foundation, and then
                finds and recommends additional verified resources from around
                the internet to students to support their learning - that means
                less searching and more learning for our student users. These
                recommended digital resources are specifically catered toward
                each students’ needs based on proprietary AI and machine
                learning technology of how that student learns best.
              </p>
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Additionally, SimpliTaught provides access to countless learning
                resources so students can find videos, lectures and materials
                from verified educators that match their unique learning style
                to assist with understanding the textbook material. Students are
                better positioned to stay up to date in their classes, ensuring
                continued academic progress while reducing dropout rates.
              </p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <Image
                src={relevant_content}
                alt="Efficient, Effective Searches For Relevant Content By Courses"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* section 2 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col order-last lg:order-first">
              <Image
                src={earner_echosystem}
                alt="The SimpliTaught Learner-Centric Ecosystem"
                priority
              />
            </div>
            <div className="space-y-6">
              <SectionTitle title="The SimpliTaught Learner-Centric Ecosystem" />
              <div className="space-y-4">
                {[
                  "SimpliTaught curates, evaluates, and presents content directly to the learner/student",
                  "Content includes free public domain assets, plus premium tier proprietary content",
                  "Content is presented based on learner preferences",
                  "SimpliTaught is a collaborative ecosystem for the creation, sharing, and distribution of learning resources",
                ].map((text, idx) => (
                  <div key={idx + 1} className="flex gap-x-4">
                    <div className="py-1">
                      <ArrowRightCircle className="w-6 h-6 text-[var(--brand-color)] shrink-0" />
                    </div>
                    <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* section 3 */}
      <section className="bg-white py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <SectionTitle title="Results Based On User Preferences" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                The adaptive learning platform provides content, key concepts
                and classes each student is studying/researching. What is
                recommended for one student is different from what is
                recommended for another student. Some students prefer access to
                physical books, some enjoy a hybrid learning environment, and
                others prefer completely online learning experiences.
              </p>
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Just like Netflix suggests programming to its subscribers,
                SimpliTaught uses AI and Machine Learning algorithms to suggest
                the best content for each user. These smart systems process and
                provide data for students to increase match rate to the best
                learning tools, whether it’s curated lectures, videos from
                favorite educators, or exam prep guides. The more SImpliTaught
                is utilized, the better it can understand a student’s learning
                style , thus guiding them to the most helpful resources.
              </p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <Image
                src={user_preference}
                alt="Results Based On User Preferences"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <div className="pt-16">
        <SectionTitle title="The Many Benefits Of SimpliTaught For Students" />
      </div>

      {/* section 4 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <SubSectionTitle title="SimpliTaught’s Smart Recommendations:" />
              <div className="space-y-4">
                {[
                  "We use a unique AI+ML model that understands your learning behavior.",
                  "Identifies key learning areas based on your interaction with the platform.",
                  "Offers smart content recommendations that perfectly match your learning preferences.",
                  "Suggests educators that best align with your learning needs.",
                ].map((text, idx) => (
                  <div key={idx + 1} className="flex gap-x-4">
                    <div className="py-1">
                      <ArrowRightCircle className="w-6 h-6 text-[var(--brand-color)] shrink-0" />
                    </div>
                    <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center flex-col order-first lg:order-last">
              <Image
                src={smart_recommendations}
                alt="SimpliTaught’s Smart Recommendations"
                priority
                width={400}
                height={400}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* section 5 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col">
              <Image src={my_drive} alt="My Drive" priority />
            </div>
            <div className="space-y-6">
              <SubSectionTitle title="My Drive:" />
              <div className="space-y-4">
                {[
                  "Store and manage study materials for research and projects.",
                  "Create folders for your classes.",
                  "Share folders/projects/assignments with your peers or educators.",
                  "Access study materials and other course content from anywhere on any device.",
                ].map((text, idx) => (
                  <div key={idx + 1} className="flex gap-x-4">
                    <div className="py-1">
                      <ArrowRightCircle className="w-6 h-6 text-[var(--brand-color)] shrink-0" />
                    </div>
                    <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* section 6 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <SubSectionTitle title="Annotations:" />
              <div className="space-y-4">
                {[
                  "Annotate digital assets, with video and audio annotations time-stamped to designated spots in a presentation.",
                  "Easily select a learning digital asset and comment on it.",
                  "Students and educators associated with the course can view your comments.",
                  "Share your annotated assets in project groups or peer study sessions with other students.",
                ].map((text, idx) => (
                  <div key={idx + 1} className="flex gap-x-4">
                    <div className="py-1">
                      <ArrowRightCircle className="w-6 h-6 text-[var(--brand-color)] shrink-0" />
                    </div>
                    <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center flex-col order-first lg:order-last">
              <Image src={annotations} alt="Annotations" priority />
            </div>
          </div>
          <div className="flex items-center justify-center mt-12">
            <div className="flex items-center gap-x-2">
              <Link
                href="#"
                className={`
                w-fit gap-x-2 py-1 whitespace-nowrap relative font-semibold text-sm lg:text-base text-[var(--brand-color)]
                before:absolute before:w-0 before:h-[3px] before:bg-[var(--brand-color)] before:bottom-1
                hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
              `}
              >
                Learn more about <strong>Annotations</strong>
              </Link>
              <ArrowRight className="w-4 h-4 text-[var(--brand-color)]" />
            </div>
          </div>
        </Container>
      </section>

      {/* section 7 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col">
              <Image
                src={exam_library}
                alt="Exam Library"
                width={450}
                height={400}
                priority
              />
            </div>
            <div className="space-y-6">
              <SubSectionTitle title="Exam Library:" />
              <div className="space-y-4">
                {[
                  "Contains a collection of annotated assets, study materials, and other resources.",
                  "Helps you prepare for upcoming exams like a pro.",
                  "Collaborate and share annotations/notes/study materials with your peers.",
                ].map((text, idx) => (
                  <div key={idx + 1} className="flex gap-x-4">
                    <div className="py-1">
                      <ArrowRightCircle className="w-6 h-6 text-[var(--brand-color)] shrink-0" />
                    </div>
                    <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* section 8 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <SubSectionTitle title="Chat/Video Call Session:" />
              <div className="space-y-4">
                {[
                  "Makes real-time interaction a reality.",
                  "Offers enhanced collaboration among students and educators.",
                  "Seamless communication between students and educators through video sessions.",
                  "Video conferencing, whiteboards, live chats, and screen sharing are at your fingertips.",
                  "Start an online live class immediately.",
                ].map((text, idx) => (
                  <div key={idx + 1} className="flex gap-x-4">
                    <div className="py-1">
                      <ArrowRightCircle className="w-6 h-6 text-[var(--brand-color)] shrink-0" />
                    </div>
                    <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center flex-col order-first lg:order-last">
              <Image
                src={video_session}
                alt="Chat/Video Call Session"
                priority
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-12">
            <div className="flex items-center gap-x-2">
              <Link
                href="#"
                className={`
                w-fit gap-x-2 py-1 whitespace-nowrap relative font-semibold text-sm lg:text-base text-[var(--brand-color)]
                before:absolute before:w-0 before:h-[3px] before:bg-[var(--brand-color)] before:bottom-1
                hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
              `}
              >
                Learn more about <strong>Video Chat Feature</strong>
              </Link>
              <ArrowRight className="w-4 h-4 text-[var(--brand-color)]" />
            </div>
          </div>
        </Container>
      </section>

      {/* section 9 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col">
              <Image src={dam_img} alt="DAM" priority />
            </div>
            <div className="space-y-6">
              <SubSectionTitle title="DAM:" />
              <div className="space-y-4">
                {[
                  "A single-stop location for all learning digital assets.",
                  "Searching for content around textbook key concepts becomes an easy-breezy task.",
                  "Scours the internet for the digital content you are looking for.",
                  "Helps with more learning and less searching, saving your time and energy.",
                ].map((text, idx) => (
                  <div key={idx + 1} className="flex gap-x-4">
                    <div className="py-1">
                      <ArrowRightCircle className="w-6 h-6 text-[var(--brand-color)] shrink-0" />
                    </div>
                    <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* section 10 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1">
            <div className="space-y-6">
              <SectionTitle title="SimpliTaught Facilitates Collaboration Between Learners Studying The Same Content" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                The SimpliTaught platform is social in nature, with a chat
                feature that creates a learning environment among students and
                educators. Students from different universities who are taking
                the same courses can share notes, helpful resources they’ve
                found, discuss chapters, and more.
              </p>
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Students also have the ability to follow or unfollow educators.
                The educators can post any additional resources they feel will
                be beneficial to students such as class notes, a syllabus,
                lecture slides, and additional videos.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default StudentPage;
