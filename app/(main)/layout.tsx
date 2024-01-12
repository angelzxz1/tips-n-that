import { NavBar } from "@/components/nav-bar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};

export default Layout;
