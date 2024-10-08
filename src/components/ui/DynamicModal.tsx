import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { Modal } from "antd";

interface IModal {
    isOpen: boolean;
    width?: number;
    confirmLoading?: boolean;
    closeModal: () => void;
    title: string | ReactNode;
    children: ReactElement | ReactElement<any, string | JSXElementConstructor<any>>;
    handleOk?: () => void;
    showCancelButton?: boolean;
    showOkButton?: boolean;
    closable?:boolean;
    maskClosable?:boolean;
    footer?: boolean | ReactNode;
}

const DynamicModal = ({
    isOpen,
    width,
    closeModal,
    title,
    children,
    handleOk,
    confirmLoading = false,
    footer,
    showCancelButton = true,
    showOkButton = true,
    maskClosable = true,
    closable = true
}: IModal) => {
    return (
        <Modal
            title={title}
            open={isOpen}
            maskClosable={maskClosable}
            closable={closable}
            width={width}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={closeModal}
            footer={footer}
            cancelButtonProps={{
                style: { display: showCancelButton ? "inline" : "none" },
            }}
            okButtonProps={{ style: { display: showOkButton ? "inline" : "none" } }}
        >
            {children}
        </Modal>
    );
};


export default DynamicModal;
