import { SolvedLab } from "./labs";
import { UserProfile } from "./userProfile";

export interface Student {
  id: number;
  user: UserProfile;
  solvedLab: SolvedLab[];
  score: number;
}