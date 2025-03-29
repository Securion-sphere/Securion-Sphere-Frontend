import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/labs", label: "Labs" },
  { href: "/learning-modules", label: "Learning Modules" },
];

export default function NavBar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const downloadOpenVPN = async () => {
    try {
      // Step 1: Fetch data from OpenVPN API route with the response type set to 'blob'
      const response = await axiosInstance.get("/user/openvpn", {
        responseType: "blob", // This ensures that the response is handled as a blob
      });

      // Step 2: Check for successful response
      if (response.status !== 200) {
        throw new Error("Failed to fetch OpenVPN data.");
      }

      // Step 3: Get the blob from the response data
      const blob = response.data;

      // Step 4: Create a link to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob); // Create a URL for the blob
      downloadLink.download = `${user?.firstName}.ovpn`; // Set a default file name
      downloadLink.click(); // Trigger the download

      // Optionally, revoke the object URL after download
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error("Error downloading OpenVPN data:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full items-center px-4 md:px-6 bg-white shadow-md">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-white">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>

          <div className="grid gap-2 py-6">
            <Image
              src={"/securion-sphere-icon.svg"}
              alt="Securion Sphere"
              width={50}
              height={50}
            />
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
          src={"/securion-sphere-icon.svg"}
          alt="Securion Sphere"
          width={50}
          height={50}
          className="mx-auto my-auto"
        />
      </Link>

      <Link href="/" className="hidden lg:block">
        <div>
          <div className="text-blue-500 text-xl font-semibold tracking-wide">
            Securion<span className="text-blue-700">Sphere</span>
          </div>
          <span className="text-[10px] text-blue-500">
            PENETRATION TESTING LEARNING PLATFORM
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="ml-auto hidden lg:flex gap-6 items-center">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group inline-flex h-9 items-center rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
            prefetch={false}
          >
            {item.label}
          </Link>
        ))}

        {/* Admin Panel Button (only visible to users with a supervisor) */}
        {user?.role === "supervisor" && (
          <Link
            href="/monitor/dashboard"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 focus:outline-none"
          >
            Admin Panel
          </Link>
        )}

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Image
              src={user?.profileImg || "/assets/icons/default_profile.png"}
              alt="Profile"
              className="h-8 w-8 rounded-full"
              width={280}
              height={280}
            />
            <span>{user?.firstName || "Anonymous"}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border">
              <Link
                href="/user"
                className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 block"
              >
                <div className="flex items-center gap-2">
                  <ProfileIcon className="w-4 h-4" />
                  <span>View Profile</span>
                </div>
              </Link>

              <hr className="my-1" />

              <button
                onClick={downloadOpenVPN}
                className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
              >
                <div className="flex items-center gap-2">
                  <DownloadIcon className="w-4 h-4" />
                  <span>Get OpenVPN</span>
                </div>
              </button>

              <hr className="my-1" />

              <button
                onClick={logout}
                className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
              >
                <div className="flex items-center gap-2">
                  <ExitIcon className="w-4 h-4" />
                  <span>Logout</span>
                </div>
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

function ProfileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}

function ExitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
      />
    </svg>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  );
}
