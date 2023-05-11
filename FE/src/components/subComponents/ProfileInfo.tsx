// import { UserType } from "@/util/types";

import { useUserContext } from "@/context/UserContext";

export default function ProfileInfo(): JSX.Element {
  const { currentUser, token } = useUserContext();
  return (
    <div>
      <div>
        <picture>
          <img className="rounded-full" src={currentUser?.image} alt="user" />
        </picture>
      </div>
      <form className="flex flex-col m-3 gap-3 ">
        <label htmlFor="">Name:</label>
        <input
          className="border-2 rounded-lg p-2"
          type="text"
          disabled
          defaultValue={currentUser?.firstName}
        />
        <label htmlFor="">Email:</label>
        <input
          className="border-2 rounded-lg p-2"
          type="text"
          disabled
          defaultValue={currentUser?.email}
        />
        <label htmlFor="">Skill:</label>
        <input
          className="border-2 rounded-lg p-2"
          type="text"
          disabled
          defaultValue={currentUser?.skills}
        />
        <label htmlFor="">Phone :</label>
        <input
          className="border-2 rounded-lg p-2"
          type="text"
          disabled
          defaultValue={currentUser?.phoneNumber}
        />

        <input
          className="border-2 rounded-lg p-2 justify-self-end "
          type="button"
          defaultValue="edit"
        />
      </form>
    </div>
  );
}
