import { Reducer } from "./index";
import { GuideActions } from "../actions";

interface IGuideShow {
  title: string;
  start: number;
  end: number;
}

type TGuideChanel = Readonly<{
  data: ReadonlyArray<IGuideShow>;
  title: string;
}>;

type TState = Readonly<{
  data: ReadonlyArray<TGuideChanel>;
  isLoading: boolean;
  error: string;
}>;

const initialState: TState = {
  data: [
    {
      title: "SRF",
      data: [
        { title: "Upps die Pannenshow", start: 10, end: 20 },
        { title: "Bauer ledig sucht", start: 20, end: 40 }
      ]
    }
  ],
  isLoading: false,
  error: ""
};

const guide: Reducer<TState, GuideActions> = (state = initialState, action) => {
  switch (action.type) {
    case GuideActions.REQUEST_GUIDE:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default guide;
