import Navbar from "@/app/components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-stretch font-sans">
        <Navbar />
        <div className="light:bg-white flex flex-row h-full items-stretch overflow-hidden">
            <Sidebar />
            {children}
        </div>

    </div>
  );
}
