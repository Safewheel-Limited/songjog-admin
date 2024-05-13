import type { MenuProps } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { BiSolidPackage } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { FaBook } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { BsFileTextFill } from "react-icons/bs";
import { BsTicketPerforated } from "react-icons/bs";
import { IoBookmarks } from "react-icons/io5";



import Link from "next/link";

export const sidebarItems = (role: string) => {
    const defaultSidebarItems: MenuProps["items"] = [
        {
            label: "Profile",
            key: "profile",
            icon: <FaUserCircle />,
            children: [
                {
                    label: <Link href={`/${role}`}>Account Profile</Link>,
                    key: `/${role}/profile`,
                },
                {
                    label: <Link href={`/${role}/change-password`}>Change Password</Link>,
                    key: `/${role}/change-password`,
                },
            ],
        },
        {
            label: "Role management",
            key: "role-management",
            icon: <FaUsersCog />,
            children: [
                {
                    label: <Link href="/administrators">Administrators</Link>,
                    key: `administrators`,
                },
                {
                    label: <Link href="/permission">Permission</Link>,
                    key: `permission`,
                },
                {
                    label: <Link href="/role">All Roles</Link>,
                    key: `role`,
                },
                // {
                //     label: <Link href={`/${role}/change-password`}>All Role</Link>,
                //     key: `/${role}/change-password`,
                // },
            ],
        },
        {
            label: "Care Package",
            key: "care-package",
            icon: <BiSolidPackage />,
            children: [
                {
                    label: <Link href="/care-package/add-care-package">Add Care Package </Link>,
                    key: `add-care-package`,
                },
                {
                    label: <Link href="/care-package/care-package-lists">All Care Package</Link>,
                    key: `care-package-lists`,
                },
                {
                    label: <Link href="/package-time/create-package-time">Create Package Time</Link>,
                    key: `create-package-time`,
                },
                {
                    label: <Link href="/package-time/package-time-lists">All Package Time</Link>,
                    key: `package-time-lists`,
                },

            ],
        },
        {
            label: "Gallery",
            key: "gallery",
            icon: <GrGallery />,
            children: [
                {
                    label: <Link href="/gallery">All Gallery</Link>,
                    key: `gallery-lists`,
                },
            ],
        },
        {
            label: "Lessons",
            key: "lessons",
            icon: <FaBook />,
            children: [
                {
                    label: <Link href="/lesson">All Lessons</Link>,
                    key: `lesson-lists`,
                },
                {
                    label: <Link href="/lesson-items">Lesson Items List</Link>,
                    key: `lesson-items-list`,
                },
                {
                    label: <Link href="/lesson-items/add-lesson-item">Add Lesson Item</Link>,
                    key: `add-lesson-item`,
                },
            ],
        },
        {
            label: "Course",
            key: "course",
            icon: <BiSolidVideos />,
            children: [
                {
                    label: <Link href="/course">Course List</Link>,
                    key: `course-list`,
                },
                {
                    label: <Link href="/course/add-course">Add New Course</Link>,
                    key: `add-course`,
                },
                {
                    label: <Link href="/review">All Reviews</Link>,
                    key: `review-lists`,
                },
                {
                    label: <Link href="/enrollment">All Enrollment</Link>,
                    key: `enrollment-lists`,
                },
            ],
        },
        {
            label: "Blog",
            key: "blog",
            icon: <BsFileTextFill />,
            children: [
                {
                    label: <Link href="/blog">Blog List</Link>,
                    key: `blog-list`,
                },
                {
                    label: <Link href="/blog/create-blog">Add New blog</Link>,
                    key: `add-blog`,
                },
                {
                    label: <Link href="/blog-category">All Blog Categories</Link>,
                    key: `blog-category-lists`,
                },
            ],
        },
        {
            label: "Level",
            key: "Level",
            icon: <BsTicketPerforated />,
            children: [
                {
                    label: <Link href="/level">All Level</Link>,
                    key: `level-lists`,
                },
            ],
        },
        {
            label: "Booking",
            key: "booking",
            icon: <IoBookmarks />,
            children: [
                {
                    label: <Link href="/booking">All Booking List</Link>,
                    key: `booking-lists`,
                },
            ],
        },
    ];

    return defaultSidebarItems;
};