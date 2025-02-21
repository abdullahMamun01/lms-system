import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroImage from "../../../public/assets/hero2.png";
export default function HeroSection() {
  return (
    <div className="min-h-screen  max-w-7xl mx-auto px-4 sm:px-1 lg:px-0 md:px-2 z-[-10]">
      <main className="container pt-24 lg:pt-32 pb-2 sm:pb-4 md:pb-6 lg:pb-16 z-[-10]">
        <div className="relative z-[-10]">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-1/2 top-0 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-y-1/3 rounded-full bg-secondary/10 blur-3xl" />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit bg-[#1A2D62] text-gray-100 py-1 px-4">
                  Transform Your Future
                </Badge>
                <h1 className="text-4xl text-[#1A2D62] font-bold tracking-tight sm:text-5xl xl:text-6xl/none ">
                  <span className="leading-tight">
                    Master New <span className="text-[#2ECA7F] ">Skills</span> at Your Own Pace
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground sm:text-xl">
                  Join our global learning community of 8M+ learners. Access
                  expert-led courses, live workshops, and interactive projects.
                </p>
              </div>

              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button size="lg" className="w-full min-[400px]:w-auto bg-[#2ECA7F] text-gray-50">
                  Start Learning Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto bg-[#1A2D62] text-gray-50"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { label: "Active Students", value: "250K+" },
                  { label: "Expert Instructors", value: "2.5K+" },
                  { label: "Course Library", value: "12K+" },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative ">
              <Image
                src={HeroImage}
                alt="Student learning"
                width={0}
                height={0}
                className="object-cover w-full h-full "
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
