export interface Lab {
  id: number;
  name: string;
  description: string;
  category: string;
  creatorName: string;
  solved: boolean;
  point: number;
}

export interface LabDocker {
  id: number;
  ip: string;
  port: number;
}

export const labDocker: LabDocker[] = [
  {
    id: 1,
    ip: "192.168.5.1",
    port: 1231,
  },
];

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
