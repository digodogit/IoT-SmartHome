"use client";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
  showDisp,
  analytics,
}: {
  children: React.ReactNode;
  showDisp: React.ReactNode;
  analytics: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      {!pathname.endsWith("/dashboard") ? (
        <div className="h-auto p-3">{children}</div>
      ) : (
        <div className="grid grid-cols-2 grid-row-2 gap-1 p-3 divide-x-2">
          <section>{showDisp}</section>
          <section>{analytics}</section>
        </div>
      )}
    </>
  );
}
