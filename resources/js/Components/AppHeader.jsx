import React, { useEffect } from "react";
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavLink,
    CNavItem,
} from "@coreui/react";

import { AppHeaderDropdown } from "./index";
import { useSelector } from "react-redux";

const AppHeader = () => {
    const user = useSelector((state) => state.app.user);

    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderBrand
                    className="mx-auto d-md-none"
                    to="/"
                ></CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <CNavLink to="/">
                            <b>Hi, {user && user.name}</b>
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav className="ms-3">
                    <AppHeaderDropdown />
                </CHeaderNav>
            </CContainer>
        </CHeader>
    );
};

export default AppHeader;
