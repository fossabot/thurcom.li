import { h, Component } from "preact";
import { connect, MapStateToPropsParam } from "preact-redux";

import { IRootState } from "../store/reducers/index";
import { AuthActions } from "../store/actions";

interface IProps {
  path: string;
  isLoading: boolean;
  error: string;
  clickLogin: any;
}
interface IState {
  email: string;
  password: string;
}

class Login extends Component<IProps, IState> {
  state: IState = {
    email: "",
    password: ""
  };
  onEmailChange = ({ target }) => this.setState({ email: target.value });
  onPasswordChange = ({ target }) => this.setState({ password: target.value });
  render(): JSX.Element {
    const { error, isLoading, clickLogin } = this.props;
    const { email, password } = this.state;
    return (<div class="columns">
      <div class="column is-4-tablet is-offset-4-tablet is-2-desktop is-offset-5-desktop">
        {error && <p class="is-danger">{error}</p>}
        <div class="field">
          <label class="label" for="email">
            Email
        </label>
          <div class="control">
            <input class="input" type="email" id="email" value={email} onChange={this.onEmailChange} />
          </div>
        </div>
        <div class="field">
          <label class="label" for="password">
            Passwort
        </label>
          <div class="control">
            <input class="input" type="password" id="password" value={password} onChange={this.onPasswordChange} />
          </div>
        </div>
        {isLoading ? (
          <button class="button is-primary is-loading">Loading</button>
        ) : (
            <button class="button is-primary" onClick={() => clickLogin(email, password)} >Login</button>
          )}
      </div>
    </div>);
  }
}

type TMapStateToProps = (state: IRootState) => Partial<IProps>;
const mapStateToProps: TMapStateToProps = ({ auth }: IRootState) => ({
  isLoading: auth.isLoading,
  error: auth.error,
});

// todo: better types
type TMapDispatchToProps = (dispatch: Function) => Partial<IProps>;
const mapDispatchToProps: TMapDispatchToProps = dispatch => ({
  clickLogin: (email, password) => dispatch({
    type: AuthActions.REQUEST_AUTH,
    email,
    password
  })
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
