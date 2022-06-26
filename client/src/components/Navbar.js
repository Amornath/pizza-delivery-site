import { useDispatch, useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducers);
  const user = useSelector((state) => state.loginUserReducers);
  const { currentUser } = user;

  return (
    <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
      <a className="navbar-brand" href="/">
        Sultan's Pizza
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse d-flex justify-content-end"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav">
          {currentUser ? (
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={currentUser.name}
              menuVariant="dark"
            >
              <NavDropdown.Item href="/order">Order</NavDropdown.Item>
              {currentUser.isAdmin === true && (
                <NavDropdown.Item href="/admin">Admin Panel</NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={() => dispatch(logout())}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
          )}
          <li className="nav-item">
            <a className="nav-link" href="/cart">
              Cart{cartState.cartItems.length}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
