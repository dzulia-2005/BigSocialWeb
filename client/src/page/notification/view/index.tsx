import React from 'react'
import { useGetallfollowers } from '../../../react-query/query/user'
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext'
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import NotNotification from '../components/notnotification';
import SkeletonNotification from '../../../components/skeletons/skeletonnotification';
import LeftSide from '../../../components/base/leftside';
import { useTranslation } from 'react-i18next';

const Notification: React.FC = () => {
  const { user } = useAuthContext();
  const { data, isLoading} = useGetallfollowers(user?._id || "");
  const {t}=useTranslation();
  

  if (isLoading) {
   
    return (
      <div className="mx-auto flex flex-col md:flex-row gap-9 lg:justify-evenly">
       <LeftSide/>
        <section className="md:w-3/4 space-y-8 flex flex-col pb-5">
          
          {Array(data).fill(0).map((_, idx) => (
            <SkeletonNotification key={idx} />
          ))}
        </section>
        <aside className="md:w-1/3 space-y-8" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col md:flex-row gap-9 lg:justify-evenly">
      <LeftSide/>
      <section className="md:w-3/4 space-y-8 flex flex-col pb-5">
        {data?.length ? (
          data.map((n) => (
            <NavLink to={`/profile/${n._id}`} key={n._id}>
              <div className="rounded-xl shadow bg-[#EAFF96] h-16 pt-2 pl-3.5">
                 {n.username} {t("notification.startedfollowing")}
                 <div className="text-sm">{dayjs().diff(dayjs(n.createdAt), "day")} {t("notification.daysago")}</div>
              </div>
            </NavLink>
          ))
        ) : (
          <NotNotification />
        )}
      </section>
      <aside className="md:w-1/3 space-y-8" />
    </div>
  );
};

export default Notification;
