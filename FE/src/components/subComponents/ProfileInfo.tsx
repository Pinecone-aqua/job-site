// import { UserType } from "@/util/types";

import { useUserContext } from "@/context/UserContext";

export default function ProfileInfo(): JSX.Element {
  const { currentUser, token } = useUserContext();
  return <div>email: {currentUser?.email}</div>;
}
