import { Student } from "./student";

export interface Lab {
  id: number;
  name: string;
  description: string;
  category: string;
  creatorName: string;
  solved: boolean;
  point: number;
}

export interface SolvedLab {
  studentId: number;
  labId: number;
  date: Date;
}

export interface AdminLab {
  id: number;
  name: string;
  description: string;
  category: string;
  creatorName: string;
  point: number;
  solvedBy?: SolvedBy[];
}

interface SolvedBy {
  studentId: number;
  labId: number;
  dateSolved: string;
  student: Student;
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