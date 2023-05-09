import JobCard from "@/components/JobCard";
import {JobType, ApplicationType} from "@/util/types";
import Link from "next/link";
import {GetStaticProps, GetStaticPropsContext} from "next";

export default function PostedJob({data}: JobProps): JSX.Element {
  const {postedJobs, allApplicants} = data;
  console.log("applicants", allApplicants);

  function filterJobApplicant(oneJobId: string | undefined) {
    const jobApplicants = allApplicants?.find(
      (arrayOfApplicants) => arrayOfApplicants.jobId === oneJobId
    );
    return jobApplicants?.applicants;
  }

  return (
    <div>
      {postedJobs?.map((job: JobType, i: number) => {
        const jobApplicants = filterJobApplicant(job._id);
        return (
          <div
            key={i}
            className="posted-jobcard container border-2 border-solid border-black relative px-5"
          >
            <Link href={`../postedjobs/${job._id}`}>
              <JobCard {...job} />
            </Link>
            <div className="border-2 border-solid border-black absolute top-0 right-0">
              <div>applicants:{jobApplicants?.length}</div>
              <div className="btn-style w-[80px]">View</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const getStaticPaths = async () => {
  const result = await fetch(`http://localhost:8008/user/user_id`);
  const user = await result.json();
  const paths = await user.map((id: {_id: string}) => ({
    params: {id: id._id},
  }));
  return {
    paths,
    fallback: false,
  };
};

interface ApplicantType {
  jobId: string;
  applicants: ApplicationType[];
}
interface JobProps {
  data: {
    postedJobs: JobType[] | null;
    allApplicants: ApplicantType[] | null;
  };
}

export const getStaticProps: GetStaticProps<JobProps> = async ({
  params,
}: GetStaticPropsContext) => {
  try {
    const postedjobs = await fetch(
      `http://localhost:8008/job/posted/${params?.id}`
    ).then((result) => result.json());

    const allApplicants = await Promise.all(
      postedjobs.map(async (job: JobType) => {
        const applicantsArray = await fetch(
          `http://localhost:8008/application/applicants/${job._id}`
        ).then((res) => res.json());
        return {
          jobId: job._id,
          applicants: applicantsArray,
        };
      })
    );
    return {
      props: {
        data: {
          postedJobs: postedjobs,
          allApplicants: allApplicants,
        },
      },
    };
  } catch (err) {
    return {
      props: {
        data: {
          postedJobs: null,
          allApplicants: null,
        },
      },
    };
  }
};