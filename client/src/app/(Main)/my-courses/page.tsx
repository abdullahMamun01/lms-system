
import MyCourses from "@/components/user/MyCourses"
export default function CourseDashboard() {
  return (
    <div className=" lg:min-h-screen bg-primary/5">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="mb-8 text-2xl font-bold text-secondary">My Course</h1>
        <MyCourses/>
      </main>
    </div>
  )
}

