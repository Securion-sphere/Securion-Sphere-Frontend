// app/data/mockModules.ts
export const mockModules = [
    {
      id: 1,
      title: "Introduction to Penetration Testing",
      description: "Learn the basics of penetration testing and ethical hacking.",
      pdfUrl: "https://eledu.ssru.ac.th/thanatyod_ja/pluginfile.php/1761/block_html/content/PrintMath2560%20-Edit.pdf",
      image: "/image/path",
    },
    {
      id: 2,
      title: "Web Application Security",
      description: "Deep dive into web application security vulnerabilities and exploits.",
      pdfUrl: "/path/to/web-application-security.pdf",
      image: "/image/path",
    },
    {
      id: 3,
      title: "Advanced Exploitation Techniques",
      description: "Master advanced techniques for exploiting systems and applications.",
      pdfUrl: "/path/to/advanced-exploitation-techniques.pdf",
      image: "/image/path",
    },
  ];

  export const getMockModuleById = (id: number) => {
    return mockModules.find((module) => module.id === id) || null;
  };