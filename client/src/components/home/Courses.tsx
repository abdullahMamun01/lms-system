import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import CourseCard from "./CourseCard";
const courses = [
  {
    title: "Sketch from A to Z: for app designer",
    description: "Proposal indulged no do sociable he throwing settling.",
    level: "All level",
    rating: 4,
    duration: "12h 56m",
    lectures: 15,
    image: "/placeholder.svg?height=200&width=400",
    backgroundColor: "bg-orange-100",
  },
  {
    title: "Graphic Design Masterclass",
    description: "Rooms oh fully taken by worse do Points afraid but may end.",
    level: "Beginner",
    rating: 4.5,
    duration: "9h 56m",
    lectures: 65,
    image: "/placeholder.svg?height=200&width=400",
    backgroundColor: "bg-blue-100",
  },
  {
    title: "Create a Design System in Figma",
    description:
      "Rooms oh fully taken by worse do. Points afraid but may end afraid but.",
    level: "Beginner",
    rating: 4.5,
    duration: "5h 56m",
    lectures: 32,
    image: "/placeholder.svg?height=200&width=400",
    backgroundColor: "bg-pink-100",
  },
  {
    title: "Deep Learning with React-Native",
    description:
      "Far advanced settling say finished raillery. Offered chiefly farther.",
    level: "Beginner",
    rating: 4,
    duration: "18h 56m",
    lectures: 99,
    image: "/placeholder.svg?height=200&width=400",
    backgroundColor: "bg-sky-100",
  },
];

// const categories = ["Web Design", "Development", "Graphic Design", "Marketing", "Finance"]

export default function Courses() {
  return (
    <section className="py-16   bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-secondary">Our Courses</h2>
          <p className="mb-8 text-secondary/80">
            Choose from hundreds of courses from specialist organizations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
        <div >
            <Button className="flex items-center gap-2 bg-primary/90 hover:bg-primary mt-6 text-gray-50 mx-auto px-6 uppercase">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </section>
  );
}
