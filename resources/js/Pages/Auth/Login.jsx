import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head>
                <title>Log in</title>
            </Head>
            <CCol md={4}>
                <CCardGroup>
                    <CCard className="p-4">
                        <CCardBody>
                            {status && (
                                <div className="mb-4 font-medium text-sm text-success">
                                    {status}
                                </div>
                            )}
                            <CForm onSubmit={submit} noValidate>
                                <h1>Login</h1>
                                <p className="text-medium-emphasis">
                                    Sign In to your account
                                </p>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                    </CInputGroupText>
                                    <CFormInput
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        autoComplete="username"
                                        value={data.username}
                                        onChange={handleOnChange}
                                        feedbackInvalid={errors.username}
                                        invalid={errors.username !== undefined}
                                        disabled={processing}
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-4">
                                    <CInputGroupText>
                                        <CIcon icon={cilLockLocked} />
                                    </CInputGroupText>
                                    <CFormInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={handleOnChange}
                                        feedbackInvalid={errors.password}
                                        invalid={errors.password !== undefined}
                                        disabled={processing}
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CFormCheck
                                        name="remember"
                                        checked={data.remember}
                                        onChange={handleOnChange}
                                        label="Remember me"
                                        disabled={processing}
                                    />
                                </CInputGroup>
                                <CRow>
                                    <CCol xs={6}>
                                        <CButton
                                            type="submit"
                                            color="primary"
                                            className="px-4"
                                            disabled={processing}
                                        >
                                            Login
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCardGroup>
            </CCol>
        </>
    );
}

Login.layout = (page) => <GuestLayout children={page} title="Welcome" />;
