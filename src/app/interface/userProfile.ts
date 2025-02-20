import { Lab } from "./labs";
import { Student } from "./student";

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  nickName: string | null;
  profileImg: string;
  email: string;
  hashedRefreshToken: string;
  role: "student" | "supervisor";
  student: Student;
}

interface supervisor {
  id: number;
  labs: Lab[];
}