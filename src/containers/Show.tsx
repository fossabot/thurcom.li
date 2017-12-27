import { h } from "preact";
import ContentLoader from "react-content-loader";

interface IProps {
  path: string;
  id: string;
}

interface IShow {
  (props: IProps): JSX.Element;
}

const Show: IShow = ({ id }) => (
  <div>
    {id}
    <ContentLoader type="facebook" />
  </div>
);

export default Show;
