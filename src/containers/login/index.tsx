import { h, Component } from "preact";
import { connect, MapStateToPropsParam } from "preact-redux";
import { route } from "preact-router";

import { IRootState } from "../../store/reducers/index";
import { requestAuth } from "../../store/actions/auth";
import LoadingButton from "../../components/loadingButton";

interface IProps {
  path: string;
  isLoading: boolean;
  error: string;
  clickLogin: any;
  authToken: string;
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
  constructor(props: IProps) {
    super(props);
    if (props.authToken) {
      // route("/");
    }
  }
  onEmailChange = ({ target }) => this.setState({ email: target.value });
  onPasswordChange = ({ target }) => this.setState({ password: target.value });
  render(): JSX.Element {
    const { error, isLoading, clickLogin } = this.props;
    const { email, password } = this.state;
    return (
      <div class="columns">
        <div class="column is-4-tablet is-offset-4-tablet is-2-desktop is-offset-5-desktop">
          {error && <p class="is-danger">{error}</p>}
          <div class="field">
            <label class="label" for="email">
              Email
            </label>
            <div class="control">
              <input
                class="input"
                type="email"
                id="email"
                value={email}
                onChange={this.onEmailChange}
              />
            </div>
          </div>
          <div class="field">
            <label class="label" for="password">
              Passwort
            </label>
            <div class="control">
              <input
                class="input"
                type="password"
                id="password"
                value={password}
                onChange={this.onPasswordChange}
              />
            </div>
          </div>
          <LoadingButton isLoading={isLoading} onClick={() => clickLogin(email, password)}>Login</LoadingButton>
        </div>
      </div>
    );
  }
}

type TMapStateToProps = (state: IRootState) => Partial<IProps>;
const mapStateToProps: TMapStateToProps = ({ auth }: IRootState) => ({
  isLoading: auth.isLoading,
  error: auth.error,
  authToken: auth.authToken
});

// todo: better types
type TMapDispatchToProps = (dispatch: Function) => Partial<IProps>;
const mapDispatchToProps: TMapDispatchToProps = dispatch => ({
  clickLogin: (email, password) => dispatch(requestAuth(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
