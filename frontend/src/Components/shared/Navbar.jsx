import decode from "jwt-decode";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../../redux/features/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.user }));
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const navLink =
    "text-center md:px-4 w-full py-3 inline-block text-gray-100 text-lg uppercase";
  const handleSearch = (e) => {};

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("token");
  };

  return (
    <nav style={{ backgroundColor: "#3f2f3f" }}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row  justify-start md:justify-between md:items-center">
        <div className="flex justify-between w-full">
          <Link
            to="/"
            className="py-1 inline-block text-gray-100 text-lg uppercase"
          >
            Feature Request
          </Link>
        </div>

        <ul
          className={
            "md:flex flex-col md:flex-row items-center justify-center transition"
          }
        >
          <li className="w-full">
            <Link to="/" className={navLink}>
              Home
            </Link>
          </li>
          <li className="w-full">
            <Link to="/" className={navLink}>
              Contact
            </Link>
          </li>
          {user?.result._id && (
            <li className="w-full">
              <Link to="/dashboard" className={navLink}>
                dashboard
              </Link>
            </li>
          )}
          {user?.result._id ? (
            <li className="w-full">
              <button className={navLink} onClick={() => handleLogout()}>
                logout
              </button>
            </li>
          ) : (
            <li className="w-full">
              <button className={navLink} onClick={() => {}}>
                <Link to="/login">Login</Link>
              </button>
            </li>
          )}

          <form className="d-flex input-group w-auto" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control bg-gray-300 transition-all rounded px-2 py-1 w-40 focus:outline-none text-gray-500"
              placeholder="Enter Search Features"

              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
