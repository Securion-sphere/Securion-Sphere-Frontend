export interface Module {
  id: number;
  title: string;
  description: string;
  image: string;
  fileUrl: string;
  fileType: "pdf" | "markdown";
}

export const mockModules: Module[] = [
  {
    id: 1,
    title: "Introduction to Penetration Testing",
    description:
      "Penetration testing and ethical hacking are essential skills in cybersecurity that involve assessing the security of systems, networks, and applications to identify vulnerabilities before malicious hackers can exploit them. These practices help organizations improve their defenses and mitigate risks.",
    image:
      "https://img.freepik.com/free-vector/futuristic-technological-wallpaper_79603-1093.jpg",
    fileUrl: "http://10.22.4.62:9000/public/0.%202567_PE_lec00.pdf",
    fileType: "pdf",
  },
  {
    id: 2,
    title: "Web Application Security",
    description:
      "Deep dive into web application security vulnerabilities and exploits.",
    fileUrl: "http://10.22.4.62:9000/public/Network%20Enumeration%20with%20NMAP.md",
    image:
      "https://www.shutterstock.com/image-illustration/web-application-security-concept-measures-600nw-2480010371.jpg",
      fileType: "markdown",
    },
  {
    id: 3,
    title: "Advanced Exploitation Techniques",
    description:
      "Master advanced techniques for exploiting systems and applications.",
    fileUrl: "http://10.22.4.62:9000/public/README.md",
    image:
      "https://c4.wallpaperflare.com/wallpaper/371/264/21/itzmauuuroo-hackers-anonymous-hd-wallpaper-preview.jpg",
      fileType: "markdown",
  },
  {
    id: 4,
    title: "Network Security Fundamentals",
    description:
      "Explore the fundamentals of network security and the various threats that can compromise network integrity.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:
      "https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148870460.jpg",
      fileType: "pdf",
    },
  {
    id: 5,
    title: "Social Engineering and Phishing",
    description:
      "Learn the techniques behind social engineering attacks, including phishing, and how to defend against them.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:
      "https://t3.ftcdn.net/jpg/02/26/00/86/360_F_226008623_4oE1scCARXUIEMLK23oPJTbJM8RK6RH0.jpg",
      fileType: "pdf",
    },
  {
    id: 6,
    title: "Cryptography and Encryption",
    description:
      "Understand the principles of cryptography and encryption techniques used to secure data and communications.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:
      "https://w0.peakpx.com/wallpaper/717/172/HD-wallpaper-hacker-green-iphone5-iphone6.jpg",
      fileType: "pdf",
    },
  {
    id: 7,
    title: "Malware Analysis and Reverse Engineering",
    description:
      "Gain knowledge on how to analyze malware and reverse engineer it to understand its behavior.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:
      "https://media.istockphoto.com/id/1345812496/photo/abstract-warning-of-a-detected-malware-program.jpg?s=612x612&w=0&k=20&c=DVFjkKG1zYtEqQBqcYKe-2f0DTrICznwYs9aYqLQJfI=",
      fileType: "pdf",
    },
];

export const getMockModuleById = (id: number) => {
  return mockModules.find((module) => module.id === id) || null;
};
