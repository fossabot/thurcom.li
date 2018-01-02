import { Reducer } from "redux";

export interface IGuideShow {
  title: string;
  start: number;
  end: number;
}

export type TGuideChanel = Readonly<{
  data: ReadonlyArray<IGuideShow>;
  title: string;
}>;

export type TGuideState = Readonly<{
  data: ReadonlyArray<TGuideChanel>;
  isLoading: boolean;
  error: string;
}>;

const initialState: TGuideState = {
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

const guide: Reducer<TGuideState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "REQUEST_GUIDE":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default guide;
