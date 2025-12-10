import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";


function MainLayout() {
  const location = useLocation();
  const hideFooterRoutes = ["/quiz", "/signin", "/signup"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <NavBar />
      <main className="pt-20 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-[background,color] duration-300">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default MainLayout;
