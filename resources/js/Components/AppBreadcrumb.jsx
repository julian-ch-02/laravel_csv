import React, { useEffect, useState } from "react";

import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import routes, { getRouteName } from "@/_routes";
import { useSelector } from "react-redux";

const AppBreadcrumb = () => {
    const user = useSelector((state) => state.app.user);
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        setBreadcrumbs(getBreadcrumbs(route().current()));
    }, [user]);

    const getBreadcrumbs = (location) => {
        const breadcrumbs = [];
        location.split(".").reduce((prev, curr, index, array) => {
            const currentPathname = prev ? `${prev}.${curr}` : curr;
            const routeName = getRouteName(currentPathname, routes);
            routeName &&
                breadcrumbs.push({
                    pathname: currentPathname,
                    name: routeName,
                    active: index + 1 === array.length,
                });
            return currentPathname;
        }, undefined);
        return breadcrumbs;
    };

    return (
        <CBreadcrumb className="m-0 ms-2">
            <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
            {breadcrumbs.map((breadcrumb, index) => {
                return (
                    <CBreadcrumbItem
                        {...(breadcrumb.active
                            ? { active: true }
                            : {
                                  href: route().has(breadcrumb.pathname)
                                      ? route(breadcrumb.pathname)
                                      : "#",
                              })}
                        key={index}
                    >
                        {breadcrumb.name}
                    </CBreadcrumbItem>
                );
            })}
        </CBreadcrumb>
    );
};

export default React.memo(AppBreadcrumb);
