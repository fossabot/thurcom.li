import { h, FunctionalComponent } from "preact";

interface IProps {
  path: string;
  id: string;
}

const Show: FunctionalComponent<IProps> = ({ id }) => <div>{id}</div>;

export default Show;
