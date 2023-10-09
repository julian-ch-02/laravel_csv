import React from "react";
import {
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from "@coreui/react";
import {
    cilBell,
    cilCommentSquare,
    cilEnvelopeOpen,
    cilTask,
    cilAccountLogout,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "../../../assets/avatars/8.jpg";
import { router } from "@inertiajs/react";

const AppHeaderDropdown = () => {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle
                placement="bottom-end"
                className="py-0"
                caret={false}
            >
                <CAvatar src={avatar8} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem onClick={handleLogout}>
                    <CIcon icon={cilAccountLogout} className="me-2" />
                    Log Out
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default AppHeaderDropdown;
