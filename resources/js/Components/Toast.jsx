import React from "react";
import { CToast, CToastBody, CToastClose } from "@coreui/react";

export const Toast = ({ message = "Success save data" }) => {
    return (
        <CToast
            autohide={true}
            visible={true}
            color="info"
            animation={true}
            className="text-white align-items-center"
        >
            <div className="d-flex">
                <CToastBody>{message}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
            </div>
        </CToast>
    );
};
