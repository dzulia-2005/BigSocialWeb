import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const Postcommentskeleton = () => {
  return (

<div className="mx-auto flex flex-col md:flex-row gap-9">
<aside className=" md:w-1/6 space-y-8 hidden  md:block"/>
  <section className="md:w-3/4 space-y-8 flex flex-col">
    {/* Skeleton for post */}
    <div className="rounded-xl shadow bg-[#EAFF96]">
      <div className="flex items-center justify-between pr-6 relative">
        <div className="pl-6 flex items-center pt-6">
          <Skeleton circle={true} height={40} width={40} />
          <div className="ml-4">
            <Skeleton width={100} />
          </div>
        </div>
      </div>
      <div className="pl-6">
        <Skeleton width={200} height={20} />
      </div>
      <div className="mx-6">
        <Skeleton width="100%" height={250} />
      </div>
      {/* Skeleton for comment section */}
      <div className="flex items-center px-6 py-4">
        <Skeleton circle={true} height={40} width={40} />
        <div className="ml-4">
          <Skeleton width={80} />
        </div>
      </div>
      <div className="pl-6">
        <Skeleton width="70%" height={40} className="mb-2" />
        <Skeleton width={160} height={40} />
      </div>
    </div>
  </section>
  <aside className="md:w-1/3 space-y-8"></aside>
</div>

  )
}

export default Postcommentskeleton