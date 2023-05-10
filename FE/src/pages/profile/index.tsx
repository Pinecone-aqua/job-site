import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfileInfo from "@/components/subComponents/ProfileInfo";
import Posted from "@/components/subComponents/Posted";
import Applied from "@/components/subComponents/Applied";
import History from "@/components/subComponents/History";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { UserType } from "@/util/types";

export default function Profile() {
  const router = useRouter();
  const { currentUser, token } = useUserContext();
  const [activeBtn, setActiveBtn] = useState<
    "profile" | "posted" | "applied" | "history"
  >("profile");

  //   useEffect(() => {
  //     if (!token) {
  //       router.push("/login");
  //     }

  //     // const userInfo = axios("http://localhost:8008/getProfile", {
  //     //   headers: {
  //     //     authorizedToken: `Bearer: ${token}`,
  //     //   },
  //     // });
  //   }, [currentUser, router, token]);

  let activeComponent = <ProfileInfo />;
  switch (activeBtn) {
    case "profile":
      activeComponent = <ProfileInfo />; //user data
      break;
    case "posted":
      activeComponent = <Posted />; //userData
      break;
    case "applied":
      activeComponent = <Applied />; // userData
      break;
    case "history":
      activeComponent = <History />; // userData
      break;
    default:
      activeComponent = <ProfileInfo />; // userData
  }

  return (
    <div className="w-full flex border-2 rounded-lg">
      <div className="border-2 rounded-lg h-min p-5 w-1/5">
        <ul>
          <li onClick={() => setActiveBtn("profile")}>Profile Info</li>
          <li onClick={() => setActiveBtn("posted")}>Posted Jobs</li>
          <li onClick={() => setActiveBtn("applied")}>Applied Jobs</li>
          <li onClick={() => setActiveBtn("history")}>History</li>
        </ul>
      </div>
      <div className="border-2 w-4/5 rounded-lg">{activeComponent}</div>
    </div>
  );
}
