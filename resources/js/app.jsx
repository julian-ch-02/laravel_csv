import "./bootstrap";
import "../scss/style.scss";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        );
        page.then((module) => {
            module.default.layout =
                module.default.layout ||
                ((page) => (
                    <AuthenticatedLayout
                        children={page}
                        auth={page.props.auth}
                        permissions={page.props.permissions}
                    />
                ));
        });
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <Provider store={store}>
                <App {...props} />
            </Provider>
        );
    },
    progress: {
        color: "#0063ff",
        showSpinner: true,
    },
});
