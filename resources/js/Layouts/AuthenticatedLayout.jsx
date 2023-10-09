import React, { useEffect, useRef } from "react";
import { AppHeader } from "@/Components";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/Redux/reducer/AppReducer";
import { CContainer, CToaster } from "@coreui/react";
import { Head } from "@inertiajs/react";
import { getRouteName } from "@/_routes";

export default function AuthenticatedLayout({ auth, children }) {
    const dispatch = useDispatch();
    const toast = useSelector((state) => state.app.toast);
    const toaster = useRef();

    useEffect(() => {
        dispatch(setUser(auth.user));
    }, [auth]);

    return (
        <div>
            <Head>
                <title>{getRouteName(route().current())}</title>
            </Head>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <CContainer lg>{children}</CContainer>
                </div>
            </div>

            <CToaster ref={toaster} push={toast} placement="top-end" />
        </div>
    );
}
