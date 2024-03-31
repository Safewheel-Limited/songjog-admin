const PackageListsColumnRenderer = () => {
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "createdAt",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_: any, data: any) => (
                <p>
                    {new Date(data?.createdAt?.toString()).toLocaleString(undefined, {
                        hour12: true,
                    })}
                </p>
            ),
        },
        {
            title: "updatedAt",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (_: any, data: any) => (
                <p>
                    {new Date(data?.updatedAt?.toString()).toLocaleString(undefined, {
                        hour12: true,
                    })}
                </p>
            ),
        },

    ];

    return columns;
};

export default PackageListsColumnRenderer;
