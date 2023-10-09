import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CProgress,
    CRow,
    CTable,
    CCol,
    CForm,
    CFormInput,
    CProgressBar,
    CTableBody,
    CTableRow,
    CTableDataCell,
    CBadge,
} from "@coreui/react";
import { useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FILE_STATUS } from "./_status";

export default function Dashboard(props) {
    const [dataFile, setDataFile] = useState(props.data);

    const { post, processing, setData, errors, reset, progress } = useForm({
        files: "",
    });

    useEffect(() => {
        setDataFile(props.data);
    }, [props.data]);

    useEffect(() => {}, [dataFile]);

    const updateStatusById = (status, id) => {
        setDataFile((prevData) =>
            prevData.map((item) => {
                return item.id == id ? { ...item, status } : item;
            })
        );
    };

    window.Echo.private(`App.Models.User.${props.auth.user.id}`).listen(
        "NotifyProgressUploadEvent",
        (e) => {
            updateStatusById(e.status, e.id);
        }
    );

    const handleOnChange = (e) => {
        const key = e.target.id;
        let value = e.target.files[0];
        setData(key, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("dashboard"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CForm onSubmit={handleSubmit}>
                        <CCardBody>
                            <CRow>
                                <div className="mb-2">
                                    <CFormInput
                                        id={"files"}
                                        type="file"
                                        label="Files"
                                        disabled={processing}
                                        onChange={handleOnChange}
                                        feedbackInvalid={errors.files}
                                        invalid={errors.files !== undefined}
                                    />
                                    {progress && (
                                        <CProgress value={progress.percentage}>
                                            <CProgressBar>
                                                {progress.percentage} %
                                            </CProgressBar>
                                        </CProgress>
                                    )}
                                </div>
                            </CRow>
                            <CRow>
                                <CTable
                                    columns={[
                                        {
                                            key: "id",
                                            label: "#",
                                            _props: { scope: "col" },
                                        },
                                        {
                                            key: "name",
                                            label: "File Name",
                                        },
                                        {
                                            key: "status",
                                            label: "Status",
                                        },
                                        {
                                            key: "created_at",
                                            label: "Uploaded At",
                                        },
                                    ]}
                                >
                                    <CTableBody>
                                        {dataFile.map((item, index) => (
                                            <CTableRow key={`row.${index}`}>
                                                <CTableDataCell key={index}>
                                                    {index + 1}
                                                </CTableDataCell>
                                                <CTableDataCell
                                                    key={`name.${index}`}
                                                >
                                                    {item.name}
                                                </CTableDataCell>
                                                <CTableDataCell
                                                    key={`status.${index}`}
                                                >
                                                    <CBadge
                                                        color={
                                                            FILE_STATUS[
                                                                item.status
                                                            ]
                                                        }
                                                    >
                                                        {item.status}
                                                    </CBadge>
                                                </CTableDataCell>
                                                <CTableDataCell
                                                    key={`created_at.${index}`}
                                                >
                                                    <p>
                                                        {moment(
                                                            item.created_at
                                                        ).format(
                                                            "YYYY-MM-DD HH:mm:ss"
                                                        )}
                                                    </p>
                                                    {moment(
                                                        item.created_at
                                                    ).fromNow()}
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))}
                                    </CTableBody>
                                </CTable>
                            </CRow>
                        </CCardBody>
                        <CCardFooter>
                            <CButton
                                className="float-end mb-2"
                                type={"submit"}
                                color={"primary"}
                                disabled={processing}
                                onSubmit={handleSubmit}
                            >
                                Upload
                            </CButton>
                        </CCardFooter>
                    </CForm>
                </CCard>
            </CCol>
        </CRow>
    );
}
