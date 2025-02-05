import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/labs", label: "Labs" },
  { href: "/learning-modules", label: "Learning Modules" },
  { href: "#", label: "Contact" },
];

export default function NavBar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full items-center px-4 md:px-6 bg-white shadow-md">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <Image
              src={"/securion-sphere_icon.svg"}
              alt="Securion Sphere"
              width={5}
              height={5}
              className="mx-auto mb-4"
            />
            <span className="sr-only">Securion Sphere</span>
          </Link>
          <div className="grid gap-2 py-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <Image
          src={"/securion-sphere_icon.svg"}
          alt="Securion Sphere"
          width={50}
          height={50}
          className="mx-auto my-auto"
        />
        <span className="sr-only">Securion Sphere</span>
      </Link>

      {/* Navigation Links */}
      <nav className="ml-auto hidden lg:flex gap-6 items-center">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
            prefetch={false}
          >
            {item.label}
          </Link>
        ))}

        {/* Admin Panel Button (only visible to users with a supervisor) */}
        {user?.supervisor && (
          <Link
            href="/monitor/dashboard"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 focus:outline-none"
          >
            Admin Panel
          </Link>
        )}

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Image
              src={user?.profile_img || "/assets/icons/default_profile.png"}
              alt="Profile"
              className="h-8 w-8 rounded-full"
              width={280}
              height={280}
            />
            <span>{user?.firstName || "Anonymous"}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
              <Link
                href="/user"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                View Profile
              </Link>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
