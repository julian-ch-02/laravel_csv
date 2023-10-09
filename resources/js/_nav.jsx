import React from "react";
import CIcon from "@coreui/icons-react";
import { cilDescription, cilSpeedometer } from "@coreui/icons";
import { CNavItem } from "@coreui/react";

const _nav = [
    {
        component: CNavItem,
        name: "Dashboard",
        to: "/dashboard",
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
            color: "info",
            text: "NEW",
        },
    },
    {
        component: CNavItem,
        name: "Docs",
        href: "https://coreui.io/react/docs/templates/installation/",
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    },
];

export default _nav;
