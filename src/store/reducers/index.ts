import auth, { TAuthState } from "./auth";
import guide, { TGuideState } from "./guide";

export interface IRootState {
  auth: TAuthState;
  guide: TGuideState;
}

export default {
  auth,
  guide
};
