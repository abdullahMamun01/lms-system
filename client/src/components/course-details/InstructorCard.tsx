import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import InstructroImage from "../../../public/assets/instructor.jpg";
interface Instructor {
  name: string;
  role: string;
  organization: string;
  image: string;
  type: "lead" | "assistant";
  companyLogos?: (string | StaticImageData)[];
}

export default function InstructorCard({
  instructor,
}: {
  instructor: Instructor;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="px-5 pt-6 pb-4 flex justify-between">
        <div>
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className="bg-purple-50 text-primary hover:bg-purple-50"
            >
              <BadgeCheck className="w-4 h-4 mr-1" />
              LEAD INSTRUCTOR
            </Badge>
            <h3 className="font-bold text-xl">{instructor.name}</h3>
            <p className="text-muted-foreground text-sm">{instructor.role}</p>
            <p className="text-muted-foreground text-sm">
              {instructor.organization}
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            {instructor.companyLogos?.map((logo, j) => (
              <Image
                key={j}
                src={logo || "/placeholder.svg"}
                alt="Company logo"
                width={100}
                height={30}
                className="opacity-75"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-start mb-0">
          <Image
            src={InstructroImage}
            alt={instructor.name}
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
