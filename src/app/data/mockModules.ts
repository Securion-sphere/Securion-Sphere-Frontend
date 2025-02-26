export interface Module {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  fileName: string;
  fileUrl: string;
  fileType: "pdf" | "md";
}

export const mockModules: Module[] = [
  {
    id: 1,
    title: "Introduction to Penetration Testing",
    description:
      "Penetration testing and ethical hacking are essential skills in cybersecurity that involve assessing the security of systems, networks, and applications to identify vulnerabilities before malicious hackers can exploit them. These practices help organizations improve their defenses and mitigate risks.",
    imageUrl:
      "https://img.freepik.com/free-vector/futuristic-technological-wallpaper_79603-1093.jpg",
    fileName: "0. 2567_PE_lec00.pdf",
    fileUrl: "http://10.22.4.62:9000/public/0.%202567_PE_lec00.pdf",
    fileType: "pdf",
  },
  {
    id: 2,
    title: "Web Application Security",
    description:
      "Deep dive into web application security vulnerabilities and exploits.",
    imageUrl:
      "https://www.shutterstock.com/image-illustration/web-application-security-concept-measures-600nw-2480010371.jpg",
    fileName: "Network_Enumeration_with_NMAP.md",
    fileUrl: "http://10.22.4.62:9000/public/Network%20Enumeration%20with%20NMAP.md",
    fileType: "md",
    },
];

export const getMockModuleById = (id: number) => {
  return mockModules.find((module) => module.id === id) || null;
};
