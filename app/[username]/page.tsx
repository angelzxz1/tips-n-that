const UserPage = ({ params }: { params: { username: string } }) => {
    console.log(params);
    return <div>User Page</div>;
};

export default UserPage;
