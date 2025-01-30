import { SolvedLab } from "./labs";
import { UserProfile } from "./userProfile";

export interface Student {
  id: number;
  year: number;
  user: UserProfile;
  solved_lab: SolvedLab[];
  score: number;
}