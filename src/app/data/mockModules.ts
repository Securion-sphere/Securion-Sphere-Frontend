export const mockModules = [
  {
    id: 1,
    title: "Introduction to Penetration Testing",
    description:
      "Penetration testing and ethical hacking are essential skills in cybersecurity that involve assessing the security of systems, networks, and applications to identify vulnerabilities before malicious hackers can exploit them. These practices help organizations improve their defenses and mitigate risks.",
    pdfUrl:
      "http://10.22.4.62:9090/browser/main/learning-material%2F0.%202567_PE_lec00.pdf",
    image:
      "https://img.freepik.com/free-vector/futuristic-technological-wallpaper_79603-1093.jpg",
  },
  {
    id: 2,
    title: "Web Application Security",
    description:
      "Deep dive into web application security vulnerabilities and exploits.",
    pdfUrl: "/path/to/web-application-security.pdf",
    image:
      "https://www.shutterstock.com/image-illustration/web-application-security-concept-measures-600nw-2480010371.jpg",
  },
  {
    id: 3,
    title: "Advanced Exploitation Techniques",
    description:
      "Master advanced techniques for exploiting systems and applications.",
    pdfUrl: "/path/to/advanced-exploitation-techniques.pdf",
    image:
      "https://c4.wallpaperflare.com/wallpaper/371/264/21/itzmauuuroo-hackers-anonymous-hd-wallpaper-preview.jpg",
  },
  {
    id: 4,
    title: "Network Security Fundamentals",
    description:
      "Explore the fundamentals of network security and the various threats that can compromise network integrity.",
    pdfUrl: "/path/to/network-security-fundamentals.pdf",
    image: "https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148870460.jpg",
  },
  {
    id: 5,
    title: "Social Engineering and Phishing",
    description:
      "Learn the techniques behind social engineering attacks, including phishing, and how to defend against them.",
    pdfUrl: "/path/to/social-engineering-and-phishing.pdf",
    image: "https://t3.ftcdn.net/jpg/02/26/00/86/360_F_226008623_4oE1scCARXUIEMLK23oPJTbJM8RK6RH0.jpg",
  },
  {
    id: 6,
    title: "Cryptography and Encryption",
    description:
      "Understand the principles of cryptography and encryption techniques used to secure data and communications.",
    pdfUrl: "/path/to/cryptography-and-encryption.pdf",
    image: "https://w0.peakpx.com/wallpaper/717/172/HD-wallpaper-hacker-green-iphone5-iphone6.jpg",
  },
  {
    id: 7,
    title: "Malware Analysis and Reverse Engineering",
    description:
      "Gain knowledge on how to analyze malware and reverse engineer it to understand its behavior.",
    pdfUrl: "/path/to/malware-analysis-and-reverse-engineering.pdf",
    image: "https://media.istockphoto.com/id/1345812496/photo/abstract-warning-of-a-detected-malware-program.jpg?s=612x612&w=0&k=20&c=DVFjkKG1zYtEqQBqcYKe-2f0DTrICznwYs9aYqLQJfI=",
  },
  {
    id: 8,
    title: "Wireless Network Security",
    description:
      "Learn about the security issues related to wireless networks, including Wi-Fi vulnerabilities and their exploitation.",
    pdfUrl: "/path/to/wireless-network-security.pdf",
    image: "https://media.istockphoto.com/id/1328160370/video/a-woman-is-working-at-home-using-a-modem-router-connecting-the-internet-to-her-laptop.jpg?s=640x640&k=20&c=V4CEMLqoJ5GORkr5UHMBl5x7vwY_AflBOpU8lPkHLRc=",
  },
  {
    id: 9,
    title: "Mobile Security and Hacking",
    description:
      "Study the security challenges and exploits related to mobile devices and their applications.",
    pdfUrl: "/path/to/mobile-security-and-hacking.pdf",
    image: "https://png.pngtree.com/thumb_back/fw800/background/20231001/pngtree-enhanced-smartphone-security-shielded-and-verified-with-pin-code-password-on-image_13554601.png",
  },
  {
    id: 10,
    title: "Cloud Security",
    description:
      "Explore the security challenges associated with cloud computing and strategies for securing cloud environments.",
    pdfUrl: "/path/to/cloud-security.pdf",
    image: "https://t4.ftcdn.net/jpg/05/74/74/37/360_F_574743730_R39nhM49fcSVDBXShPcE5bvvW5bkv8dD.jpg",
  },
  {
    id: 11,
    title: "Red Teaming and Penetration Testing",
    description:
      "Learn how to perform red team operations and simulate real-world attacks on systems to test their defenses.",
    pdfUrl: "/path/to/red-teaming-and-penetration-testing.pdf",
    image: "https://backiee.com/static/wallpapers/560x315/332645.jpg",
  },
  {
    id: 12,
    title: "Incident Response and Forensics",
    description:
      "Study the steps involved in incident response and digital forensics to investigate security breaches.",
    pdfUrl: "/path/to/incident-response-and-forensics.pdf",
    image: "https://wallpapercave.com/wp/wp486145.webp",
  },
  {
    id: 13,
    title: "Operating System Security",
    description:
      "Understand the security mechanisms within operating systems and how to protect against OS-level exploits.",
    pdfUrl: "/path/to/operating-system-security.pdf",
    image: "https://hackblue.org/images/parrotos.PNG",
  },
  {
    id: 14,
    title: "Physical Security and Hardware Hacking",
    description:
      "Explore the basics of physical security and techniques for hacking hardware devices.",
    pdfUrl: "/path/to/physical-security-and-hardware-hacking.pdf",
    image: "https://spectrum.ieee.org/media-library/dynamite-and-timer-atop-a-magnified-image-of-a-circuit-board.jpg?id=51579046&width=800&height=750&quality=85",
  },
  {
    id: 15,
    title: "Web Application Firewalls",
    description:
      "Learn how web application firewalls (WAFs) work to protect web applications from attacks.",
    pdfUrl: "/path/to/web-application-firewalls.pdf",
    image: "https://t4.ftcdn.net/jpg/06/16/55/61/360_F_616556145_cleJGiU3pSrvN23KdEqLjXD2YMSoGkmY.jpg",
  },
];

export const getMockModuleById = (id: number) => {
  return mockModules.find((module) => module.id === id) || null;
};
