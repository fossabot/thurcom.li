import { h, FunctionalComponent } from "preact";

const Input: FunctionalComponent<JSX.HTMLAttributes> = ({ children, id, ...rest }) => (
    <div class="field">
        <label class="label" for={id}>
            {children}
        </label>
        <div class="control">
            <input
                class="input"
                id={id}
                { ...rest }
            />
        </div>
    </div>
);

export default Input;