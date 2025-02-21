export interface Lab {
  id: number;
  name: string;
  description: string;
  category: string;
  solvedBy: SolvedBy[];
  point: number;
  isReady: boolean;
}
export interface LabsRecord {
  score: number;
  solvedLab: SolvedLab[];
}

export interface SolvedLab {
  studentId: number;
  labId: number;
  solvedAt: Date;
  lab: Lab;
}

export interface Lab {
  id: number;
  name: string;
  category: string;
  point: number;
}
export interface SolvedByUser {
  id: number;
  firstName: string;
  lastName: string;
  nickName: string | null;
  email: string;
  profileImg: string;
}
export interface SolvedBy {
  user: SolvedByUser;
  solvedAt: Date;
}

export interface ImageProp {
  id: number;
  imageName: string;
}

export const labs: Lab[] = [
  {
    id: 1,
    name: "Web Application for SQL Injection",
    description: "Test",
    category: "Injection",
    solvedBy: [],
    point: 100,
    isReady: true,
  },
];
