import Console from "./components/Console";
import Home from "./components/Home";
import {useRoutes} from "react-router-dom";

export default function Routes () {
    return useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: '/console/:ticket',
            element: <Console />,
        },
    ])
};
