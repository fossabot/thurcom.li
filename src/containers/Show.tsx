import { h } from "preact";

interface IProps {
  path: string;
  id: string;
}
type TShow = (props: IProps) => JSX.Element;

const Show: TShow = ({ id }) => <div>{id}</div>;

export default Show;
