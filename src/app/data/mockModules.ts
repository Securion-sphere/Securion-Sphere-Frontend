// app/data/mockModules.ts
export const mockModules = [
    {
      id: 1,
      title: "Introduction to Penetration Testing",
      description: "Learn the basics of penetration testing and ethical hacking.",
      content: "This module covers the fundamental concepts of penetration testing, including...",
      pdfUrl: "https://eledu.ssru.ac.th/thanatyod_ja/pluginfile.php/1761/block_html/content/PrintMath2560%20-Edit.pdf",
    },
    {
      id: 2,
      title: "Web Application Security",
      description: "Deep dive into web application security vulnerabilities and exploits.",
      content: "In this module, we explore common web application vulnerabilities...",
      pdfUrl: "/path/to/web-application-security.pdf",
    },
    {
      id: 3,
      title: "Advanced Exploitation Techniques",
      description: "Master advanced techniques for exploiting systems and applications.",
      content: "This advanced module covers exploit development, privilege escalation...",
      pdfUrl: "/path/to/advanced-exploitation-techniques.pdf",
    },
  ];

  export const getMockModuleById = (id: number) => {
    return mockModules.find((module) => module.id === id) || null;
  };