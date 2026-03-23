export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold">DevTrack</h1>
      <p className="text-gray-500">Track your coding time easily 🚀</p>

      <div className="flex gap-4">
        <a
          href="/tracker"
          className="px-6 py-3 bg-blue-500 text-white rounded-xl"
        >
          Go to Tracker
        </a>

        <a
          href="/logs"
          className="px-6 py-3 bg-gray-800 text-white rounded-xl"
        >
          View Logs
        </a>
      </div>
    </div>
  );
}