export interface Lab {
  name: string;
  description: string;
  category: string;
  creator: string;
  solved: boolean;
  point: number;
}

export const labs: Lab[] = [
  {
    name: "Web Application for SQL Injection",
    description: "Test",
    category: "Injection",
    creator: "Mr. Injection",
    solved: true,
    point: 100,
  },
];
