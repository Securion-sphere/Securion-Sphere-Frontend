import { Lab } from "./labs";

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  profile_img: string;
  hashedRefreshToken: string;
  solved_machine: Lab[];
}
