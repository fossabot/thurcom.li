import { h } from "preact";
import { connect } from "preact-redux";

interface IProps {
  path: string;
}

interface ILogin {
  (props: IProps): JSX.Element;
}

const Login: ILogin = () => (
  <div class="columns">
    <div class="column is-4-tablet is-offset-4-tablet is-2-desktop is-offset-5-desktop">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" />
        </div>
      </div>
      <div class="field">
        <label class="label">Passwort</label>
        <div class="control">
          <input class="input" type="password" />
        </div>
      </div>
    </div>
  </div>
);

export default connect()(Login);
