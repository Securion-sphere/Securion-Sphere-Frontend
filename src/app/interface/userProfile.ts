import { LabsRecord } from "./labs";

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  nickName: string | null;
  profileImg: string;
  email: string;
  role: "student" | "supervisor";
  student: LabsRecord;
}
