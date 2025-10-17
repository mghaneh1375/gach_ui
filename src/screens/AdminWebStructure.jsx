import {useParams} from 'react-router';
import {lazy} from 'react';

const Advisor = lazy(() => import('./panel/advisor/Advisor.jsx'));
const BuyReport = lazy(() => import('./panel/reports/buyReport/BuyReport'));
const AdminDashboard = lazy(() => import('./panel/dashboard/Dashboard'));
const TeachReports = lazy(() =>
  import('./panel/teach/teachReport/TeachReports'),
);
const AdviceReports = lazy(() =>
  import('./panel/advisor/adviceReports/AdviceReports.jsx'),
);
const TeachTagsReport = lazy(() =>
  import('./panel/teach/tagReports/TeachTagsReport'),
);
const AdviceTagsReport = lazy(() =>
  import('./panel/advisor/adviceTagReports/AdviceTagsReport.jsx'),
);

const AdminWebStructue = ({isUserAdmin, page}) => {
  const params = useParams();
  if (!isUserAdmin) return <></>;
  return (
    <>
      {page === 'dashboard' && <AdminDashboard />}
      {page === 'buyReport' && <BuyReport />}
      {page === 'advisorFullInfo' && <Advisor />}
      {page === 'adviceReports' && <AdviceReports />}
      {page === 'teachReports' && <TeachReports />}
      {page === 'basic' &&
        params &&
        params.mode &&
        params.mode === 'teachTagsReport' && <TeachTagsReport />}
      {page === 'basic' &&
        params &&
        params.mode &&
        params.mode === 'adviceTagsReport' && <AdviceTagsReport />}
    </>
  );
};
export default AdminWebStructue;
