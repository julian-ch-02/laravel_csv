import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    sidebarShow: true,
    sidebarUnfoldable: false,
    permissions: [],
    toast: null,
};
export const appSlice = createSlice({
    name: "appReducer",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                user: action.payload,
            };
        },
        setSidebarShow: (state, action) => {
            return {
                ...state,
                sidebarShow: action.payload,
            };
        },
        setSidebarUnfoldable: (state, action) => {
            return {
                ...state,
                sidebarUnfoldable: action.payload,
            };
        },
        setPermissions: (state, action) => {
            return {
                ...state,
                permissions: action.payload,
            };
        },
        addToast: (state, action) => {
            return {
                ...state,
                toast: action.payload,
            };
        },
    },
});

export const {
    setUser,
    setSidebarShow,
    setSidebarUnfoldable,
    setPermissions,
    addToast,
} = appSlice.actions;
export default appSlice.reducer;
