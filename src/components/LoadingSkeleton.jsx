/* eslint-disable react/prop-types */
const LoadingSkeleton = ({ itemsPerPage = 10 }) => {
  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-5">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(itemsPerPage)].map((_, idx) => (
          <div
            key={idx}
            className="border border-blue-200 shadow rounded-md p-4 max-w-sm w-full mx-auto"
          >
            <div className="animate-pulse">
              <div className="rounded-md bg-slate-400 h-[200px] w-full mb-4"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-400 rounded"></div>
                <div className="space-y-3">
                  <div className="h-2 bg-slate-400 rounded"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
