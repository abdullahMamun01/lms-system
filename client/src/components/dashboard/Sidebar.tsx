import {
    BookOpen,
    LayoutGrid,
    MessageSquare,
    Plus,
  } from "lucide-react";
  import Link from "next/link";

  const sidebarLinks = [
    { text: 'Courses', href: '/dashboard/courses', icon: <BookOpen className="w-4 h-4" /> },
    { text: 'Add Course', href: '/dashboard/courses/add-course', icon: <Plus className="w-4 h-4" /> },
    { text: 'Lives', href: '#', icon: <MessageSquare className="w-4 h-4" /> },
    { text: 'Quizzes', href: '#', icon: <LayoutGrid className="w-4 h-4" /> },
  ];

export default function Sidebar() {
  return (
    <div className="w-64 border-r bg-background p-6">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-[">
          <div className="h-full w-full rounded-lg bg-primary/10 p-2">
            <div className="h-full w-full rounded-md bg-primary" />
          </div>
        </div>
        <Link href="/">
          <span className="text-xl font-bold">Educare</span>
        </Link>
      </div>
      <nav className="space-y-2">
      {sidebarLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground px-3 py-2"
        >
          {link.icon}
          {link.text}
        </Link>
      ))}
      </nav>
    </div>
  );
}
