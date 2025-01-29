import { Link, Outlet } from "react-router-dom";
import "./Home.css";
import Button from "@mui/material/Button";

export function Home() {
  return (
    <>
      <h1>Home</h1>

      <div className="container">
        <aside>
          <nav>
            <ul>
              <li>
                <Link to="/back"> Users List </Link>
              </li>
              <li>
                <Link to="/projects"> create and list Project  </Link>
              </li>
              <li>
                <Link to="/stories"> create and list Story </Link>
              </li>
              <li>
                <Link to="/sprints"> create and list Sprint </Link>
              </li>
              <li>
                <Link to="/tasks"> create and list Task </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="container">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
