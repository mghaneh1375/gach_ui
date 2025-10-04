import {Route} from 'react-router-dom';
import WebStructue from '../../screens/WebStructure.jsx';

const AdminRoutes = [
  <Route
    key={'admin/stats/general'}
    path="admin/stats/general"
    element={<WebStructue page="generalStats" />}
  />,
  <Route
    key={'admin/report/general'}
    path="admin/report/general"
    element={<WebStructue page="buyReport" />}
  />,
  <Route
    key={'admin/teach/reports'}
    path="admin/teach/reports"
    element={<WebStructue page="teachReports" />}
  />,
  <Route
    key={'admin/teach/list'}
    path="admin/teach/list"
    element={<WebStructue page="allTeaches" />}
  />,
  <Route
    key={'admin/teach/transactions'}
    path="admin/teach/transactions"
    element={<WebStructue page="allTeachTransactions" />}
  />,
  <Route
    key={'admin/content/findMissed'}
    path="admin/content/findMissed"
    element={<WebStructue page="findMissedInContent" />}
  />,
];

export default AdminRoutes;
