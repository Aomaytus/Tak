import React, { useState, useEffect } from "react";
import { Button, Image, Modal } from "antd";
import LineChang from "./LineChang";
const LineSetting = () => {
    const showPopconfirm = () => {
        setOpen(true);
    };
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const warning = () => {
        Modal.warning({
            title: 'แก้ไข TOKEN',
            content: (
                <div>
                    <LineChang />
                </div>
            ),
            onOk() { },
            cancelText: 'ออก',
            okText: 'ออก',
            okType: 'danger',
        });
    };
    return (
        <div>
            <center>
                <div style={{marginBottom:"10px"}}>
                    <Image
                        width={40}
                        preview={false}
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2e/LINE_New_App_Icon_%282020-12%29.png"
                    />
                </div>

                <Button type="dashed" onClick={warning}> แก้ไข TOKEN การเชื่อมต่อ LINE Notify </Button>
            </center>
        </div>

    );
};
export default LineSetting