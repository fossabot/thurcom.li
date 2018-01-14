import { h, FunctionalComponent } from "preact";
import { connect } from "preact-redux";
import { map } from "lodash";

import "./style.sass";
import { IRootState } from "../../store/reducers";
import { TGuideChanel, IGuideShow } from "../../store/reducers/guide";
import Show from "../../components/show";

interface IProps {
  path: string;
  chanels: ReadonlyArray<TGuideChanel>;
}

const Guide: FunctionalComponent<IProps> = ({ chanels: [chanel] }) => {
  const shows: JSX.Element[] = map(chanel.data, data => <Show data={data} />);
  const { start } = chanel.data[0];
  const position: any = {
    marginLeft: -start * 20
  };
  return (
    <div class="guide">
      <div class="chanel" style={position}>
        {shows}
      </div>
    </div>
  );
};

type TMapStateToProps = (state: IRootState) => Partial<IProps>;
const mapStateToProps: TMapStateToProps = state => ({
  chanels: state.guide.data
});

export default connect(mapStateToProps)(Guide);
