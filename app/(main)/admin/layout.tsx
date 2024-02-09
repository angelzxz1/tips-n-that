const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex justify-center pt-20 w-full">
            <div className="w-full lg:w-2/3">{children}</div>
        </div>
    );
};

export default Layout;
