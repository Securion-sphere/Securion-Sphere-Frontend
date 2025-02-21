export interface Student {
  user_id: number;
  user: UserProfileSummary;
  solvedLab: StudentSolvedLab[];
  totalScore: number;
}

interface UserProfileSummary {
  id: number;
  firstName: string;
  lastName: string;
  nickName: string | null;
}

interface StudentSolvedLab {
  solvedAt: Date;
  lab: {
    id: number;
    name: string;
    point: number;
  };
}
