// src/components/DashboardEmbed.js
"use client";

export const config = { runtime: "client" }; // Mark this component as a client component
import { useEffect, useState } from "react";
import { embedDashboard } from "@preset-sdk/embedded";
import styles from './DashboardEmbed.module.css'; // Import the CSS module

const DashboardEmbed = () => {
  const [guestToken, setGuestToken] = useState("");

  const fetchGuestToken = async () => {
    try {
      const response = await fetch("/api/token");
      const data = await response.json();
      setGuestToken(data.token);
    } catch (error) {
      console.error("Error fetching guest token:", error);
    }
  };

  useEffect(() => {
    fetchGuestToken();
  }, []);

  useEffect(() => {
    if (guestToken) {
      embedDashboard({
        id: process.env.NEXT_PUBLIC_DASHBOARD_ID,
        supersetDomain: process.env.NEXT_PUBLIC_SUPERSET_DOMAIN,
        mountPoint: document.getElementById("dashboard-container"),
        fetchGuestToken: () => Promise.resolve(guestToken),
        dashboardUiConfig: {
          hideTitle: false,
          hideChartControls: false,
          filters: { expanded: true },
        },
      });
    }
  }, [guestToken]);

  return <div id="dashboard-container" className={styles.dashboardContainer}></div>;
};

export default DashboardEmbed;

