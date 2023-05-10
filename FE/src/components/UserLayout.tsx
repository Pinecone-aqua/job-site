import { ReactNode } from "react";
import UserSideBar from "./UserSideBar";

interface PropType {
  children: ReactNode;
}

export default function UserLayout({ children }: PropType): JSX.Element {
  return (
    <div>
      <div>
        <UserSideBar />
      </div>
      <div>{children}</div>
    </div>
  );
}
