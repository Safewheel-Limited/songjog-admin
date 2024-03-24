import { ReactElement, ReactNode } from "react";
import { Modal } from "antd";

interface IModal {
    isOpen: boolean;
    confirmLoading?: boolean;
    closeModal: () => void;
    title: string | ReactNode;
    children: ReactElement;
    handleOk?: () => void;
    showCancelButton?: boolean;
    showOkButton?: boolean;
    footer?: string | ReactNode;
}

const DynamicModal = ({
    isOpen,
    closeModal,
    title,
    children,
    handleOk,
    confirmLoading = false,
    footer,
    showCancelButton = true,
    showOkButton = true,
}: IModal) => {
    return (
        <Modal
            title={title}
            open={isOpen}
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
