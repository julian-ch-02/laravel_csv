import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
    return (
        <CFooter>
            <div>
                <span className="ms-1">
                    &copy; {new Date().getFullYear()} Mitra Service Management
                    System.
                </span>
            </div>
            <div className="ms-auto">
                <span className="me-1">v1.0.0 build 1</span>
            </div>
        </CFooter>
    );
};

export default React.memo(AppFooter);
