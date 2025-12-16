import { Suspense } from "react";
import Gallery from "@/components/home/gallery/Gallery";
import AudioPlayer from "@/components/home/audio-player/AudioPlayer";
import Welcome from "@/components/home/welcome-section/Welcome";
import EventsContainer from "@/components/home/Events-container/EventsContainer";
import TestimonialsContainer from "@/components/home/testimonials-container/TestimonialsContainer";
import VideoPlayer from "@/components/home/video-player/VideoPlayer";
import RecentBlog from "@/components/home/recent-blog/RecentBlog";
import Newsletter from "@/components/home/newsletter/Newsletter";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="w-full flex-col items-center justify-betweensm:items-start">
        <Suspense fallback={<div>Loading welcome section...</div>}>
          <Welcome />
        </Suspense>
        <Suspense fallback={<div>Loading events...</div>}>
          <EventsContainer />
        </Suspense>
        <Suspense fallback={<div>Loading gallery...</div>}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<div>Loading audio player...</div>}>
          <AudioPlayer />
        </Suspense>
        <Suspense fallback={<div>Loading video player...</div>}>
          <VideoPlayer />
        </Suspense>
        <Suspense fallback={<div>Loading testimonials...</div>}>
          <TestimonialsContainer />
        </Suspense>
        <Suspense fallback={<div>Loading recent blog posts...</div>}>
          <RecentBlog />
        </Suspense>
        <Suspense fallback={<div>Loading newsletter...</div>}>
          <Newsletter />
        </Suspense>
      </main>
    </div>
  );
}
