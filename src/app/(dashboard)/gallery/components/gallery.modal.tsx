import { useGetMultipleDataWithDynamicQuery } from "@/common/hooks";
import React, { FC } from "react";
import { GALLERY_GET_ALL } from "../graphql/gallery.query";
import DynamicModal from "@/components/ui/DynamicModal";
import { useModal } from "@/common/store";
import { MODAL_ENUMS } from "@/common/constants";
import { Button, Flex, Pagination, message } from "antd";
import Image from "next/image";
import { useSelectImages } from "../store";
import GallerySkeleton from "./gallery.skeleton";


type PropType = {
    isSingleSelect?: boolean;
}

const GalleryModal: FC<PropType> = ({ isSingleSelect }) => {

    const { data, limit, loading, page, onPaginationChange
    } =
        useGetMultipleDataWithDynamicQuery({ query: GALLERY_GET_ALL });
    const { modal, setModal } = useModal();
    const { selectImages, handleSelectImages, resetSelectedImages } = useSelectImages();

    const handleSelectImage = (item: any) => {
        if (isSingleSelect) {
            resetSelectedImages();
            handleSelectImages({ id: item.id, fileUrl: item.fileUrl })
        } else {
            handleSelectImages({ id: item.id, fileUrl: item.fileUrl })
        }
    }
    return (
        <DynamicModal
            title="Images"
            isOpen={modal === MODAL_ENUMS.OPEN_GALLERY_MODAL}
            closeModal={() => setModal("")}
            width={700}
            showCancelButton
            footer={
                <Flex justify="flex-end" gap={10}>
                    <Button onClick={() => setModal("")}>Cancel</Button>
                    <Button onClick={() => setModal("")} type="primary">Add Images</Button>
                </Flex>
            }
        >
            <>
                <div>
                    <Flex justify="flex-start" align="center" wrap="wrap" gap={10}>
                        {loading
                            ? Array.from({ length: 12 }).map((_, idx) => (
                                <GallerySkeleton key={idx} />
                            ))
                            : !loading &&
                            (data as any)?.galleryGetAll?.data.map((item: any) => (
                                <Image
                                    src={item.fileUrl}
                                    alt={item.name}
                                    width={150}
                                    height={150}
                                    placeholder="blur"
                                    blurDataURL="https://via.placeholder.com/150x150"
                                    loading="lazy"
                                    objectFit="cover"
                                    objectPosition="top center"
                                    key={item.id}
                                    onClick={() => handleSelectImage(item)}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "10px",
                                        border: selectImages.filter(image => image.id === item.id).length
                                            ? "3px solid blue"
                                            : "",
                                    }}
                                />
                            ))}
                    </Flex>
                </div>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <Pagination
                        current={page}
                        pageSize={limit}
                        total={(data as any)?.galleryGetAll?.pagination.total}
                        onChange={onPaginationChange}
                    />
                </div>
            </>
        </DynamicModal>
    );
};

export default GalleryModal;
