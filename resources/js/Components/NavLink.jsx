import { Link } from "@inertiajs/react";
import React from "react";

const NavLink = React.forwardRef((props, ref) => {
    let { to, className, children } = props;
    return (
        <Link
            className={`${className} ${
                window.location.pathname.startsWith(to) ? "active" : ""
            }`}
            href={to}
        >
            {children}
        </Link>
    );
});

export default NavLink;
