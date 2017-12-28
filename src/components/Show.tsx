import { h } from "preact";

import style from "./show.sass";
import { IGuideShow } from "../store/reducers/guide";

interface IProps {
  data: IGuideShow;
}
type TShow = (props: IProps) => JSX.Element;

const scale: number = 20;

const Show: TShow = ({ data }) => {
  const position: any = {
    width: (data.end - data.start) * scale,
    left: data.start * scale
  };
  return (
    <div style={position} className={style.show}>
      {data.title}
    </div>
  );
};

export default Show;
