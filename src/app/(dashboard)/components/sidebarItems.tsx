import type { MenuProps } from "antd";
import {
    ProfileOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const sidebarItems = (role: string) => {
    const defaultSidebarItems: MenuProps["items"] = [
        {
            label: "Profile",
            key: "profile",
            icon: <ProfileOutlined />,
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
            icon: <ProfileOutlined />,
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
            icon: <ProfileOutlined />,
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
            label: <Link href="/gallery">Gallery</Link>,
            key: "gallery",
            icon: <ProfileOutlined />,
        }
    ];

    return defaultSidebarItems;
};