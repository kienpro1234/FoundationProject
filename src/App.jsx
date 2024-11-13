import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo/UserInfo";
import Root from "./pages/Root";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import MenuDetails from "./pages/MenuDetails";
import { isEmail, queryClient } from "./utils/util";
import { QueryClientProvider } from "@tanstack/react-query";
import FoodDetail from "./pages/FoodDetail";
import MenuDetailError from "./pages/MenuDetailError";
import { SearchingContextProvider } from "./context/headerContext";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import { LoginContextProvider } from "./context/loginContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        // path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/menu",
        element: <Menu />,
        children: [
          { index: true, element: <Navigate to={"/menu/all"} /> },
          {
            path: "/menu/:id",
            element: <MenuDetails />,
            errorElement: <MenuDetailError />,
          },
        ],
      },

      {
        path: "/food/:id",
        element: <FoodDetail />,
        errorElement: <MenuDetailError />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/userinfo",
    element: <UserInfo />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  console.log("vlll", isEmail("213291814"));
  return (
    <QueryClientProvider client={queryClient}>
      <SearchingContextProvider>
        <LoginContextProvider>
          <RouterProvider router={router} />
        </LoginContextProvider>
      </SearchingContextProvider>
    </QueryClientProvider>
  );
}

export default App;
