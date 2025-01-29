import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import { Counters } from "./pages/Counters";
import { Trips } from "./pages/Trips";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { createContact, getContacts } from "./contacts";
import UserPage from "./pages/UserPage";
import { BackUsers } from "./pages/BackUsers";
import { BackProjects } from "./pages/BackProjects";
import { BackStories } from "./pages/BackStories";
import { BackSprints } from "./pages/BackSprints";
import { BackTasks } from "./pages/BackTasks";
// import { useScore } from './ScoreReducer'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement:(
        <div id="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <Link to="/">Go Home</Link>
      </div>
      ),
      children: [
        {
          path: "/counters",
          element: <Counters/>
        },
        {
          path: "/trips",
          element: <Trips/>
        },
        {
          path: "/contacts",
          element: <Contacts/>,
          loader: async () => {
            const contacts = await getContacts();
            return { contacts };
          },
          action: async () => {
            const contact = await createContact();
            return { contact };
          }
        },
        {
          path: "/users",
          element: <UserPage/>
        },
        {
          path: "/back",
          element: <BackUsers/>
        },
        { 
          path: "/projects", 
          element: <BackProjects /> 
        },
        { 
          path: "/stories", 
          element: <BackStories /> 
        },  
        { 
          path: "/sprints",
           element: <BackSprints /> 
        },  
        { 
          path: "/tasks", 
          element: <BackTasks /> 
        }, 
      ]
    }
  ]);
  
  return (
      <RouterProvider router={router} >
        
      </RouterProvider>
  );
}

export default App;
