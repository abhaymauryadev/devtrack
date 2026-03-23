import { formatSeconds } from "@/lib/time";

export default function SessionCard({ session }: any) {
  return (
    <div className="p-4 border rounded">
      <p>Start: {new Date(session.startTime).toLocaleString()}</p>
      <p>End: {session.endTime ? new Date(session.endTime).toLocaleString() : "Running"}</p>
      <p>Duration: {session.duration ? formatSeconds(session.duration) : "-"}</p>
    </div>
  );
}