const _routes = [{ name: "dashboard", title: "Dashboard" }];

export const getRouteName = (pathname) => {
    const currentRoute = _routes.find((route) => route.name === pathname);
    return currentRoute ? currentRoute.title : false;
};

export default _routes;
