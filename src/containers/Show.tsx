import { h } from "preact";

interface IProps {
  path: string;
  id: string;
}

interface IShow {
  (props: IProps): JSX.Element;
}

const Show: IShow = ({ id }) => <div>{id}</div>;

export default Show;
