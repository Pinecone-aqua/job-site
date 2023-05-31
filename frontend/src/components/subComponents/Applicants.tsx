import {ApplicationType, UserType} from "@/util/types";
import moment from "moment";
import {useEffect, useState} from "react";

interface PropType {
  selectedJobId: string | undefined;
  setActiveBtn: React.Dispatch<
    React.SetStateAction<
      "profile" | "posted" | "applied" | "history" | "applicants" | "applicant"
    >
  >;
  setSelectedApplicationId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

interface ApplicantType extends Omit<ApplicationType, "userId"> {
  userId: UserType;
}

export default function Applicants({
  selectedJobId,
  setActiveBtn,
  setSelectedApplicationId,
}: PropType) {
  const [applicants, setApplicants] = useState<ApplicantType[] | undefined>();

  useEffect(() => {
    try {
      const getJobApplicants = async () => {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/jobId/${selectedJobId}`
        ).then((res) => res.json());
        setApplicants(result);
      };
      getJobApplicants();
    } catch (error) {
      console.log(error);
    }
  }, [selectedJobId]);
  console.log("applicants", applicants);

  function showSingleApplicant(applicationId: string | undefined) {
    console.log("single applicant go", applicationId);
    setSelectedApplicationId(applicationId);
    setActiveBtn("applicant");
  }

  return (
    <div className="applicants-page flex flex-col gap-4">
      {applicants?.map((applicant, i) => (
        <div
          key={i}
          className="applicant-card flex gap-5 shadow-md"
          onClick={() => showSingleApplicant(applicant._id)}
        >
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="applicant-card-img"
              src={applicant.userId.image}
              alt={applicant.userId.firstName}
            />
          </div>
          <div>
            <div>
              {applicant.userId.firstName} {applicant.userId.lastName}
            </div>
            <div>Applied {moment(applicant.createdDate).calendar()}</div>
            <div>{applicant.userId.gender}</div>
            <div>Email: {applicant.userId.email}</div>
            <div>Phone: {applicant.userId.phoneNumber}</div>
          </div>
          <div>
            <div className="border-2 border-solid">
              CV: {applicant.userId.cv}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
