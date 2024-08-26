import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Header from "./camponents/Header/Header.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import PremiumPlanner from "./pages/PremiumPlanner/PremiumPlanner.jsx";
import YourClient from "./pages/YourClients/YourClient.jsx";
import ShowPlan from "./camponents/Plan/ShowPlan.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="yourclient" element={<YourClient />} />
        </Route>

        <Route path="/dashboard/premiumplanner" element={<PremiumPlanner />}>
          <Route path="showplan" element={<ShowPlan />}></Route>
        </Route>
        <Route path="/premiumplanner" element={<PremiumPlanner />} />
        <Route path="/showplan" element={<ShowPlan />} ></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <RouterProvider router={router} />
  </div>
);
