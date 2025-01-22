import { Lab } from "./labs";
import { UserProfile } from "./userProfile";

export interface Student {
  id: number;
  year: number;
  user: UserProfile;
  solved_lab: Lab[];
  score: number;
}