import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import VideoPlayer from "@/components/video-player";
import PageTitle from "../../_components/page-title";
import SubSectionTitle from "../../_components/sub-section-title";

const HowItWorksPage = () => {
  return (
    <div>
      <Container>
        <div className="pt-24">
          <PageTitle title="How it works?" />
        </div>
        <div className="space-y-14 mt-14">
          {/* Features for Students */}
          <div className="space-y-6">
            <div className="bg-white p-4 drop-shadow-md rounded-lg space-y-4">
              <SubSectionTitle title="Features for Students" />
              <Separator />
              <VideoPlayer src="https://www.youtube.com/watch?v=Dsa2YzPQe08" />
            </div>
          </div>

          {/* How to Edit or Update Your Profile. */}
          <div className="space-y-6">
            <div className="bg-white p-4 drop-shadow-md rounded-lg space-y-4">
              <SubSectionTitle title="How to Edit or Update Your Profile" />
              <Separator />
              <VideoPlayer src="https://www.youtube.com/watch?v=EmfT2s9OEW8" />
            </div>
          </div>

          {/* How To Set Term Start and Term End. */}
          <div className="space-y-6">
            <div className="bg-white p-4 drop-shadow-md rounded-lg space-y-4">
              <SubSectionTitle title="How To Set Term Start and Term End" />
              <Separator />
              <VideoPlayer src="https://www.youtube.com/watch?v=iG7D1fzp8Yc" />
            </div>
          </div>

          {/* How To Annotate A Video */}
          <div className="space-y-6">
            <div className="bg-white p-4 drop-shadow-md rounded-lg space-y-4">
              <SubSectionTitle title="How To Annotate A Video" />
              <Separator />
              <VideoPlayer src="https://www.youtube.com/watch?v=ayG4ZUcvWzg" />
            </div>
          </div>

          {/* How To Add and Make a Course Active */}
          <div className="space-y-6">
            <div className="bg-white p-4 drop-shadow-md rounded-lg space-y-4">
              <SubSectionTitle title="How To Add and Make a Course Active" />
              <Separator />
              <VideoPlayer src="https://www.youtube.com/watch?v=0Top5BzYKWQ" />
            </div>
          </div>

          {/* How To Add and Make a Course Active */}
          <div className="space-y-6">
            <div className="bg-white p-4 drop-shadow-md rounded-lg space-y-4">
              <SubSectionTitle title="How to Chat and Collaborate in Real-time" />
              <Separator />
              <VideoPlayer src="https://www.youtube.com/watch?v=HeGFPHdH-2U" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HowItWorksPage;
