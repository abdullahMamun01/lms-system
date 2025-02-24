import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ILecture } from "@/interfaces/lecture.inteface";
import navigateToLession from "@/utils/navigateToLession";
import { usePathname, useRouter } from "next/navigation";



export default function SearchInput({ lectures  }: { lectures: ILecture[] }) {

  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredLectures, setFilteredLectures] =
    React.useState<ILecture[]>(lectures);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = lectures.filter(
      (lecture) =>
        lecture.title.toLowerCase().includes(query.toLowerCase()) ||
        lecture.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLectures(filtered);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="relative" ref={searchContainerRef}>
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        className="pl-9 bg-[#2A2B3E] border-0"
        placeholder="Search Lesson"
        onFocus={() => {
            setIsSearchFocused(true);
            setFilteredLectures(lectures); // Reset lectures on focus
          }}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchQuery}
      />

      {isSearchFocused && (
        <Card className="absolute top-full w-full mt-2 z-50 bg-[#1A1B2E]">
          <CardContent className="p-0 hover:text-gray-800 ">
            <ScrollArea className="h-[300px] rounded-md">
              {filteredLectures.map((lecture) => (
                <button
                  key={lecture._id}
                  className="w-full px-4 py-2 text-left hover:bg-muted flex items-center  justify-between gap-2"
                  onClick={() => {
                    // Handle lecture selection
                    setIsSearchFocused(false);
                    setSearchQuery(lecture.title);
                    navigateToLession(lecture._id as string, pathname,router)
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-gray-200 hover:text-gray-800 ">
                      {lecture.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lecture.title}
                    </p>
                  </div>
                
                </button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
