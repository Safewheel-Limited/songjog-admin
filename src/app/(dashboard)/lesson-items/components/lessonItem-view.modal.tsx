"use client";
import DynamicModal from "@/components/ui/DynamicModal";
import { MODAL_ENUMS } from "@/common/constants";
import { useModal } from "@/common/store";
import { useSaveLessonItemId } from "../store";
import { useGetSingleDataWithDynamicQuery } from "@/common/hooks";
import { GET_LESSON_ITEM } from "../graphql";

const LessonItemViewModal = () => {
    const { modal, setModal } = useModal();
    const { lessonItemId } = useSaveLessonItemId();
    const { data } = useGetSingleDataWithDynamicQuery({
        query: GET_LESSON_ITEM, variables: {
            id: lessonItemId
        }
    });

    const { title, description } = (data as any)?.lessonItemGet || {};

    return (
        <DynamicModal
            title={title}
            isOpen={modal === MODAL_ENUMS.OPEN_LESSON_ITEM_VIEW_MODAL}
            closeModal={() => setModal("")}
            showCancelButton
            footer={false}
        >
            <div dangerouslySetInnerHTML={{ __html: description }} />
        </DynamicModal >
    );
};

export default LessonItemViewModal;
