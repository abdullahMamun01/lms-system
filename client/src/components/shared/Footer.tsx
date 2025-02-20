import {
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitch,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/70 p-2"></div>
                <span className="text-2xl font-bold text-white">Educare</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Discover a world of knowledge and opportunities with our online
              education platform pursue a new career.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary/60" />
                <span className="text-sm">
                  C/54 Northwest Freeway, Houston, USA 485
                </span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Useful Links
            </h3>
            <ul className="space-y-4">
              {[
                "Course",
                "Mission & Vision",
                "Join a Career",
                "Zoom Meeting",
                "Pricing Plan",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary/60 hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Institute */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Our Institute
            </h3>
            <ul className="space-y-4">
              {[
                "Contact Us",
                "Technology",
                "Instructors",
                "Pricing",
                "Services",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary/60 hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Get In Touch
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <Phone className="h-5 w-5 text-primary/60" />
              <span className="text-sm">+152 534-468-854</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-primary/60" />
              <span className="text-sm">educare@example.com</span>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Facebook className="h-8 w-7 text-primary/60" />
                <Twitter className="h-8 w-7 text-primary/60" />
                <Instagram className="h-8 w-7 text-primary/60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 py-6 sm:flex-row">
          <p className="text-sm">
            © {new Date().getFullYear()} Educare. Design & Develop with{" "}
            <Heart className="inline h-4 w-4 text-red-500" /> by Abdullah.
          </p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            {["Terms", "Privacy", "Login"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm hover:text-primary/60 hover:underline"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
