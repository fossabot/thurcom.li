import { h, FunctionalComponent } from "preact";

interface IProps extends JSX.HTMLAttributes {
    isLoading: boolean;
}

const LoadingButton: FunctionalComponent<IProps> = ({ children, isLoading, className, onClick, ...rest }) => isLoading
    ? (
        <button
            className={"button is-primary is-loading" + className}
            {...rest}
        >
            Loading
        </button>
    )
    : (
        <button
            className={"button is-primary" + className}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button >
    );

export default LoadingButton;