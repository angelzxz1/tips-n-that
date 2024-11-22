import { Footer } from "@/components/footer/Footer";
import { NavBar } from "@/components/nav-bar";
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};

export default Layout;
