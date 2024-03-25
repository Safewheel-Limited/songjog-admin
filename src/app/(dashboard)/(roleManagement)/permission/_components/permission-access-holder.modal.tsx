import { Badge, List } from "antd";

import DynamicModal from "@/components/ui/DynamicModal";
import { useRoleAndPermissionState } from "../../store";
import { useModal } from "@/common/store";
import { MODAL_ENUMS } from "@/common/constants";

const PermissionAccessHolderModal = () => {
    const { modal, setModal } = useModal();
    const { roleAccessData } = useRoleAndPermissionState();

    return (
        <DynamicModal
            title="Accessed roles"
            closeModal={() => setModal("")}
            isOpen={modal === MODAL_ENUMS.PERMISSION_ACCESS_HOLDER_MODAL}
            handleOk={() => setModal("")}
            showCancelButton={true}
            showOkButton={false}
        >
            <List>
                {roleAccessData.map((role: any, index) => (
                    <List.Item key={index}>
                        <Badge color="blue" text={role.name} />
                    </List.Item>
                ))}
            </List>
        </DynamicModal>
    );
};

export default PermissionAccessHolderModal;
