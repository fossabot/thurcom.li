import { h, FunctionalComponent } from "preact";

interface IProps extends JSX.HTMLAttributes {
    children: any;
    isLoading: boolean;
}

const LoadingButton: FunctionalComponent<IProps> = ({ children, isLoading, className, ...rest }) => isLoading
    ? <button className={"button is-primary is-loading" + className}>Loading</button>
    : (
        <button
            className={"button is-primary" + className}
            {...rest}
        >
            {children}
        </button >
    );

export default LoadingButton;