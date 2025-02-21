
import InstructorCard from "./InstructorCard";
import Company1 from "../../../public/assets/company-1.png";
import Company2 from "../../../public/assets/company-2.png";
import { StaticImageData } from "next/image";

interface Instructor {
  name: string
  role: string
  organization: string
  image: string
  type: "lead" | "assistant"
  companyLogos?: (string | StaticImageData)[];
}

const instructors: Instructor[] = [
  {
    name: "Rafat Meraz",
    role: "Software Engineer",
    organization: "Vivasoft",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NiJjNLUXlrhhPk359gvmIYLfEU1xkR.png",
    type: "lead",
    companyLogos: [Company1],
  },
  {
    name: "Nowrose Irab Poll",
    role: "Software Engineer | Tech Enthusiast | Problem Solver",
    organization: "KUET",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NiJjNLUXlrhhPk359gvmIYLfEU1xkR.png",
    type: "lead",
    companyLogos: [ Company2],
  },
  {
    name: "Md.Taufiqur Rahman",
    role: "Software Engineer",
    organization: "Tizfal Technologies AB, Sweden",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NiJjNLUXlrhhPk359gvmIYLfEU1xkR.png",
    type: "lead",
    companyLogos: [Company1 , Company2],
  },
  {
    name: "Hasan Ahmed",
    role: "Software developer | Flutter",
    organization: "Ostad",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NiJjNLUXlrhhPk359gvmIYLfEU1xkR.png",
    type: "assistant",
    companyLogos: [Company1 , Company2],
  },
  {
    name: "Md Nayeem Ahmed",
    role: "Flutter Developer at Arbree Limited",
    organization: "Arbree Limited",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NiJjNLUXlrhhPk359gvmIYLfEU1xkR.png",
    type: "assistant",
    companyLogos: [ Company2],
  },
]

export default function InstructorSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold text-secondary uppercase">
          Instructors
        </h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor, index) => (
            <InstructorCard key={index} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}
