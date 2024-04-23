"use client";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React from "react";
import GalleryTable from "./components/gallery.table";
import UploadImage from "./components/upload-image";

const GalleryPage: React.FC = () => {
    return (
        <>
            <UploadImage />
            <GalleryTable />
        </>
    );
};

export default GalleryPage;
