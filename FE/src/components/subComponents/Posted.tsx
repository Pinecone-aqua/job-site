import { useUserContext } from "@/context/UserContext";
import { JobType } from "@/util/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Posted(): JSX.Element {
  const [jobs, setJobs] = useState<JobType[]>();
  const { currentUser, token } = useUserContext();
  const router = useRouter();

  //   const fetchJobs = (userId) => {
  //     axios
  //       .get(`http://localhost:8008/job/posted/${userId}`)
  //       .then((res) => console.log(res));
  //   };

  //   useEffect(() => {
  //     if (!token) {
  //       router.push("/login");
  //     }
  //     fetchJobs(currentUser?._id);
  //   }, []);

  return <div>Posted Jobs</div>;
}
