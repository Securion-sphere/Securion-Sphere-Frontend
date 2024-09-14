export interface Lab {
  name: string;
  category: string;
  creator: string;
  solved: boolean;
  points: number;
}

export const labs: Lab[] = [
  {
    name: "Web Application for SQL Injection",
    category: "Injection",
    creator: "Mr. Injection",
    solved: true,
    points: 100,
  },
  {
    name: "XSS is on the way!",
    category: "Injection",
    creator: "Mr. Injection",
    solved: false,
    points: 100,
  },
  {
    name: "Let's try IDOR",
    category: "Access Control",
    creator: "Mr. Injection",
    solved: false,
    points: 100,
  },
  {
    name: "Business Logic on alert!",
    category: "Business Logic",
    creator: "Mr. Injection",
    solved: true,
    points: 100,
  },
  {
    name: "Basic cookie misconfiguration",
    category: "Misconfiguration",
    creator: "Mr. Injection",
    solved: false,
    points: 100,
  },
];
