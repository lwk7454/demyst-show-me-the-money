export default function Loading() {
  return (
    <div className="sm:p-24 p-8 flex justify-center">
      <div role="status"
           className="p-8 max-w-[48rem] w-full space-y-8 border divide-y rounded shadow animate-pulse divide-gray-700 border-gray-700"
      >
        {[...Array(50).keys()].map((i) =>
          (
            <div key={i} className="grow">
              <div className="w-full h-2 rounded-full bg-gray-700"></div>
            </div>
          ))}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
