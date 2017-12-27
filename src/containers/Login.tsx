import { h } from "preact";
import { connect, MapStateToPropsParam } from "preact-redux";

interface IProps {
  path: string;
  isLoading: boolean;
  error?: string;
}

interface ILogin {
  (props: IProps): JSX.Element;
}

const Login: ILogin = ({ isLoading, error }) => (
  <div class="columns">
    <div class="column is-4-tablet is-offset-4-tablet is-2-desktop is-offset-5-desktop">
      {error && <p class="is-danger">error</p>}
      <div class="field">
        <label class="label" for="email">
          Email
        </label>
        <div class="control">
          <input class="input" type="email" id="email" />
        </div>
      </div>
      <div class="field">
        <label class="label" for="password">
          Passwort
        </label>
        <div class="control">
          <input class="input" type="password" id="password" />
        </div>
      </div>
      {isLoading ? (
        <button class="button is-primary is-loading">Loading</button>
      ) : (
        <button class="button is-primary">Login</button>
      )}
    </div>
  </div>
);

export default connect()(Login);
