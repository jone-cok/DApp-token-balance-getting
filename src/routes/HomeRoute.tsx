import path from "@/constants/path";
import Home from "@/pages/Home";
import About from "@/pages/About";

const HomeRoutes = [
  {
    path: path.HOME,
    element: <Home />,
  },
  {
    path: path.ABOUT,
    element: <About />,
  },
];


export default HomeRoutes;
