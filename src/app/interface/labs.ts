export interface Lab {
  id: number;
  name: string;
  description: string;
  category: string;
  creatorName: string;
  solved: boolean;
  point: number;
}

export const labs: Lab[] = [
  {
    id: 1,
    name: "Web Application for SQL Injection",
    description: "Test",
    category: "Injection",
    creatorName: "Mr. Injection",
    solved: true,
    point: 100,
  },
];
