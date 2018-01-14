import { h, FunctionalComponent } from "preact";

import * as style from "./style.sass";
import { IGuideShow } from "../../store/reducers/guide";

interface IProps {
  data: IGuideShow;
}

const scale: number = 20;

const Show: FunctionalComponent<IProps> = ({ data }) => {
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
