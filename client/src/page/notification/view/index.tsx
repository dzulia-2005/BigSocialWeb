import React from 'react'
import { useGetallfollowers } from '../../../react-query/query/user'
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext'
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';


const Notification: React.FC = () => {
  const { user } = useAuthContext();
  const { data, isLoading} = useGetallfollowers(user?._id || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading followers...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col md:flex-row gap-9 lg:justify-evenly">
      <aside className="md:w-1/6 space-y-8 hidden md:block" />
      <section className="md:w-3/4 space-y-8 flex flex-col pb-5">
        {data?.length ? (
          data.map((n) => (
            <NavLink to={`/profile/${n._id}`}>
              <div className="rounded-xl shadow bg-[#EAFF96] h-16 pt-2 pl-3.5" key={n._id}>
                 {n.username} started following you
                 <div className="text-sm">{dayjs().diff(dayjs(n.createdAt),"day")} days ago</div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="mx-auto flex flex-col md:flex-row gap-9 lg:justify-evenly w-[100%] text-center">
             <aside className="md:w-1/6 space-y-8 hidden md:block" />
             <section className="md:w-3/4 space-y-8 flex flex-col pb-5">
             <div className="rounded-xl shadow bg-[#EAFF96] h-16 pt-2 pl-3.5">
                     No notficitation yet     
                </div>
             </section>
          </div>
        )}
      </section>
      <aside className="md:w-1/3 space-y-8" />
    </div>
  );
};

export default Notification;