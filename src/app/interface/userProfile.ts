import { Lab } from "./labs";
import { Student } from "./student";

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  nickName: string | null;
  profile_img: string;
  email: string;
  hashedRefreshToken: string;
  student: Student;
  supervisor?: supervisor;
}

interface supervisor {
  id: number;
  labs: Lab[];
}