import { useModal } from "@/common/store";
import { Badge, List, Modal } from "antd";
import { useRoleAndPermissionState } from "../../store";
import { MODAL_ENUMS } from "@/common/constants";
import DynamicModal from "@/components/ui/DynamicModal";

const RoleAccessHolderModal = () => {
    const { modal, setModal } = useModal();
    const { permissionAccessData } = useRoleAndPermissionState();
    return (
        <DynamicModal
            title="Accessed Permissions"
            isOpen={modal === MODAL_ENUMS.ROLE_ACCESS_HOLDER_MODAL}
            closeModal={() => setModal("")}
            footer={false}
        >
            <List>
                {permissionAccessData.map((role: { name: string }, index: number) => (
                    <List.Item key={index}>
                        <Badge color="blue" text={role.name} />
                    </List.Item>
                ))}
            </List>
        </DynamicModal>
    );
};

export default RoleAccessHolderModal;
