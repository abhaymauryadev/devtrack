export default function Hero() {
  return (
   <section className="flex items-center justify-center min-h-screen px-4">
  <div className="flex flex-col justify-center items-center text-center max-w-4xl">
    
    <span className="border rounded-full px-4 py-2 text-sm sm:text-base flex items-center gap-2">
      <span className="bg-purple-500 rounded-full w-3 h-3 sm:w-4 sm:h-4"></span>
      Built for developers who code
    </span>

    <h1 className=" mt-6 font-bold tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
      Track your dev hours <br className="hidden sm:block" />
      Build your streak
    </h1>

    <p className=" text-gray-400 mt-6 text-sm sm:text-lg md:text-xlleading-relaxed">
      A minimalist productivity tracker for developers. Monitor coding time,
      <br className="hidden sm:block" /> maintain streaks, and visualize your progress
      with tactile analytics
    </p>

  </div>
</section>
  );
}
