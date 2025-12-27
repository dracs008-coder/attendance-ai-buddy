import { useTechnician } from "../../contexts/TechnicianContext";
import JobCard from "../../components/technician/JobCard";

export default function JobBoardPage() {
  const { jobs, acceptJob } = useTechnician();
  const openJobs = jobs.filter(j => j.status === "open");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Job Board</h2>
      {openJobs.length === 0 ? (
        <p className="text-gray-500 text-sm">No open jobs at the moment.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {openJobs.map(job => (
            <JobCard key={job.id} job={job} onAccept={() => acceptJob(job.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
