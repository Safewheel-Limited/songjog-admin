import { Skeleton } from 'antd'
import React from 'react'

const GallerySkeleton = () => {
    return (
        <Skeleton.Image active={true} style={{ width: "150px", height: "150px" }} />
    )
}

export default GallerySkeleton