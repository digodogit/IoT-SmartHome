import "@/components/organisms/img.css";
import SideBar from "@/components/templates/SideBar";
import Header from "@/components/templates/Header";
import Footer from "@/components/templates/Footer";
import { baseRoutes } from "@/data/pathRoutes/baseRoutes";
import DevicesContextProvider from "@/contexts/Items-context-provider";
import { getAllUserDisp } from "@/lib/server-utils";
import { SideBarContextProvider } from "@/contexts/SideBar-Context";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-t from-cyan-100 from-20% to-white-300 to-40%">
      <SideBarContextProvider items={baseRoutes}>
        <SideBar />
      </SideBarContextProvider>
      <main className="flex flex-col min-w-screen w-[1920px] content-start min-h-screen divide-cyan-700 divide-y-2 p-1">
        <section className="flex-initial min-h-[150px] h-32 ">
          <Header />
        </section>
        <div className="flex-1 self-stretch h-auto ">
          <DevicesContextProvider devices={await getAllUserDisp()}>
            {children}
          </DevicesContextProvider>
        </div>
        <section className="flex-initial min-h-[150px] h-32">
          <Footer />
        </section>
      </main>
    </div>
  );
}
