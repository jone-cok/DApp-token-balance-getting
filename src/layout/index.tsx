import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoading from "@/components/Loading/PageLoading";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout() {
  return (
    <div className="" id="layout">
      <Header />
      <div className="">
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer/>
    </div>
  );
}
