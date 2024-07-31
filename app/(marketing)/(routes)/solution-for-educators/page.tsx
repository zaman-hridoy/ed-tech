import Container from "@/components/container";
import VideoPlayer from "@/components/video-player";

import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import PageTitle from "../../_components/page-title";
import SectionTitle from "../../_components/section-title";

import banner_img from "@/public/pages/educator/banner.webp";
import collaboration from "@/public/pages/educator/collaboration.png";
import content_curation from "@/public/pages/educator/content_curation.png";
import course_module from "@/public/pages/educator/course.png";
import drive_img from "@/public/pages/educator/drive.png";
import enhance_learning from "@/public/pages/educator/enhance_learning.png";
import monetization from "@/public/pages/educator/monetization.webp";
import single_location from "@/public/pages/educator/single_location.png";
import video_call from "@/public/pages/educator/video_call.png";
import SubSectionTitle from "../../_components/sub-section-title";

const EducatorPage = () => {
  return (
    <div>
      <section className="pb-14">
        <Image
          src={banner_img}
          alt="Solution for educators"
          priority
          className="h-64 object-cover md:object-contain md:h-auto"
        />
        <div className="space-y-4 max-w-4xl mx-auto px-4 lg:px-5 pt-14">
          <PageTitle title="The SimpliTaught Solution for" />

          <h2 className="text-slate-800 font-bold text-6xl lg:text-9xl tracking-tight text-center">
            Educators
          </h2>

          <p className="text-sm lg:text-xl text-slate-800 font-medium text-center">
            SimpliTaught allows educators to find, store, and share content with
            students and other educators. We support them by identifying and
            recommending digital resources around key concepts that students are
            learning in their in-person, hybrid, or online classes.
          </p>
        </div>

        <Container>
          <VideoPlayer src="https://www.youtube.com/watch?v=8YZ0ssB4Axc" />
        </Container>
      </section>

      <div className="bg-white pt-16">
        <SectionTitle title="The Many Benefits of SimpliTaught for Educators" />
      </div>

      {/* section 1 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col">
              <Image src={course_module} alt="Course/Module" priority />
            </div>
            <div className="space-y-6">
              <SubSectionTitle title="Course/Module:" />
              <div className="space-y-4">
                {[
                  "Present collections aligned to specific textbooks.",
                  "Create courses or topical presentations aligned on a thematic basis.",
                  "Share digital assets and course collections with students…",
                  "So they have access to the resources they need to ace their studies.",
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

      {/* section 2 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col order-first lg:order-last">
              <Image
                src={content_curation}
                alt="Content Creation & Curation"
                priority
              />
            </div>
            <div className="space-y-6">
              <SubSectionTitle title="Content Creation & Curation" />
              <div className="space-y-4">
                {[
                  "Create, host, and curate (with the help of AI) content around key learning concepts…",
                  "And benefit the broader academic community, translating into greater teaching impact and recognition.",
                  "Create content right on the platform or easily upload existing content (so you don’t have to do twice the work).",
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
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col">
              <Image
                src={collaboration}
                alt="Enhanced Collaboration"
                priority
              />
            </div>
            <div className="space-y-6">
              <SubSectionTitle title="Enhanced Collaboration:" />
              <div className="space-y-4">
                {[
                  "Connect with students and provide lectures, lessons, and other resources…",
                  "Helping students master concepts they are struggling to understand through traditional textbook learning.",
                  "Foster intra-departmental collaboration among faculty members resulting in…",
                  "More effective and homogeneous quality of education across student cohorts.",
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

      {/* section 4 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col order-first lg:order-last">
              <Image
                src={drive_img}
                alt="My Drive"
                priority
                width={450}
                height={450}
              />
            </div>
            <div className="space-y-6">
              <SubSectionTitle title="My Drive:" />
              <div className="space-y-4">
                {[
                  "Store and manage your teaching materials for content and course curations.",
                  "Create and access folders and files online from anywhere.",
                  "Organize files and folders by subject or class.",
                  "Improve your students’ learning experiences and make teaching more efficient.",
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

      {/* section 5 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col">
              <Image src={video_call} alt="Chat/Video Call Session" priority />
            </div>
            <div className="space-y-6">
              <SubSectionTitle title="Chat/Video Call Session:" />
              <div className="space-y-4">
                {[
                  "Makes real-time interaction a reality.",
                  "Offers enhanced collaboration among students and educators.",
                  "Seamless communication between students and educators through video sessions.",
                  "Video conferencing, whiteboards, live chats, and screen sharing are at your fingertips.",
                  "Start an online live class with students immediately.",
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

      {/* section 5 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col order-first lg:order-last">
              <Image
                src={monetization}
                alt="Monetization & Global Reach"
                priority
                width={400}
                height={400}
              />
            </div>
            <div className="space-y-6">
              <SubSectionTitle title="Monetization & Global Reach:" />
              <div className="space-y-4">
                {[
                  "Earn incremental revenue by creating content for student consumption.",
                  "Expose your proprietary content to students studying similar key concepts at other universities…",
                  "And make money without any significant incremental costs.",
                  "A chance to develop your educational brand beyond your institution and have a global reach.",
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

      {/* section 5 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <SectionTitle title="SimpliTaught Provides Efficient, Effective Identification of Supporting Content to Extend & Enhance Learning" />
              <div className="space-y-4">
                {[
                  "Educators receive feedback on the views and utilization of the tools they curate.",
                  "They get access to statistics on materials students are searching for and using.",
                  "SimpliTaught uses AI to continuously improve the ability to match the right students with the right educators.",
                  "We enable educators to see what chapters students are struggling with.",
                  "It also shows the materials students use (and do not use) and what they’ve found beneficial.",
                  "Ultimately, it empowers educators to extend learning capabilities outside classrooms and enhance the learning experience and students’ success rate.",
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
            <div className="flex items-center justify-center flex-col">
              <Image
                src={enhance_learning}
                alt="SimpliTaught Provides Efficient, Effective Identification of Supporting Content to Extend & Enhance Learning"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* section 5 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col order-last lg:order-first">
              <Image
                src={single_location}
                alt="A Single Location To Host All Digital Assets"
                priority
                width={400}
                height={400}
              />
            </div>
            <div className="space-y-6">
              <SectionTitle title="A Single Location To Host All Digital Assets" />
              <div className="space-y-4">
                {[
                  "Educators can create “Gold” versions of their courses through SimpliTaught.",
                  "They can add their favorite additional resources and notes on course sections.",
                  "They can include additional materials students need to be successful.",
                  "Additional material may include course syllabi, coursework, educational videos, and more!",
                  "Materials are easy to create, upload, and store for years on the platform.",
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
    </div>
  );
};

export default EducatorPage;
