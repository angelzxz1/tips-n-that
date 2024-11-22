const UserPage = async ({
    params,
}: {
    params: Promise<{ username: string }>;
}) => {
    console.log(await params);
    return <div>User Page</div>;
};

export default UserPage;
