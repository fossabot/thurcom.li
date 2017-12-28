import { h } from "preact";
import { Link } from "preact-router";

type TNavbar = () => JSX.Element;

const Navbar: TNavbar = () => (
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <Link class="navbar-item" activeClassName="is-active" href="/">
        thurcom.li
      </Link>
    </div>
    <div class="navbar-menu is-active">
      <Link class="navbar-item" activeClassName="is-active" href="/recordings">
        Aufnahmen
      </Link>
      <Link class="navbar-item" activeClassName="is-active" href="/live">
        Live
      </Link>
    </div>
    <div class="navbar-end">
      <Link class="navbar-item" activeClassName="is-active" href="/login">
        Login
      </Link>
    </div>
  </nav>
);

export default Navbar;
