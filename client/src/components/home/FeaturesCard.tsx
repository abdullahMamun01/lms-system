import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeatureCards() {
  const features = [
    {
      title: "Quality Education",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.",
    },
    {
      title: "Experienced Teachers",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.",
    },
    {
      title: "Delicious Food",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="border-none bg-[#FFFFFF] ">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#1e2851]">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-500">{feature.description}</p>
              <Button variant="ghost" className="group px-0 text-[#4CAF50] hover:bg-transparent hover:text-[#45a049]">
                EXPLORE COURSES <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

