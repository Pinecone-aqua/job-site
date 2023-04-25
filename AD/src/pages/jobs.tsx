import Row from "../components/Row";
import {jobsData} from "@/utils/dummyData";

export default function Jobs(): JSX.Element {
  const buttonStyle =
    "h-[36px] p-2 flex items-center text-white font-semibold border-2 border-solid border-[#318ec2] bg-[#318ec2] rounded-[10px]";
  return (
    <div>
      <form className="flex justify-between p-2 border-2 border-solid border-slate-200 bg-white">
        <div className={buttonStyle}>Add New +</div>
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search"
            className="h-[36px] py-2 px-5 bg-[#dee6ec] rounded-full"
          />
          <div className={buttonStyle}>Filter</div>
        </div>
      </form>
      <table className="w-full table-fixed border-2 border-solid border-slate-200 rounded bg-white">
        <thead>
          <tr className="[&>*]:h-[40px] [&>*]:border [&>*]:border-slate-200 rounded-md">
            <th className="w-[40px]">No.</th>
            <th>id</th>
            <th>created</th>
            <th>title</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {jobsData.map((job, i: number) => {
            console.log(job);
            return <Row key={i} rowNumber={i} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticProps(){
  const response = await fetch("");
  const jobs = await response.json();
  console.log("response from fetch", jobs);
  return{
    props: {
      jobs: jobs,
    }
  }
}