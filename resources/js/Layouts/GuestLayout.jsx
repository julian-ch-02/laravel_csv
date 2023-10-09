import { CContainer, CRow } from "@coreui/react";

export default function Guest({ children }) {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">{children}</CRow>
            </CContainer>
        </div>
    );
}
