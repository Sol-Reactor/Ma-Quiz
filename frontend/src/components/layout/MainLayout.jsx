import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";


function MainLayout() {


  return (
    <>
      <NavBar />
      <main className="pt-20 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-[background,color] duration-300">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
