import { Search } from "./components/Search";
import { TableWithSearch } from "./components/Table";
import { Weather } from "./components/Weather";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <TableWithSearch />,
      children: [
        { path: "/", element: <TableWithSearch /> },
        { path: "/weather/:cityname", element: <Weather /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      {/* <TableWithSearch/> */}
    </>
  );
}

export default App;
