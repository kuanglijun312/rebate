import { Suspense } from "react";
import InviteLink from "./components/InviteLink";
import { Overview } from "./components/Overview";
import { InviteDetail } from "./components/InviteDetail";
import Loading from "../../components/Loading";

const DashboardPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <InviteLink className="mb-4" />
        <Overview  className="mb-4" />
        <InviteDetail />
      </Suspense>
      
    </div>
  );
}

export default DashboardPage