import Sider from "./sider";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full  h-screen  bg-black  flex overflow-y-hidden     ">
      <aside className=" md:w-1/5  h-full hidden md:block  ">
        <Sider />
      </aside>
      <div className="w-full h-full  overflow-y-auto flex flex-col ">
        <div className="flex-grow  ">{children}</div>
        <div className="h-16 w-full ">footerss</div>
      </div>
    </div>
  );
}
