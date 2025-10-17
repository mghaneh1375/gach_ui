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
    key={'admin/advice/reports'}
    path="admin/advice/reports"
    element={<WebStructue page="adviceReports" />}
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
  <Route
    key={'admin/advisor-full-info'}
    path="admin/advisor-full-info/:advisorId"
    element={<WebStructue page="advisorFullInfo" />}
  />,
  <Route
    exact
    key={'/admin/basic/:mode/:subMode'}
    path="/admin/basic/:mode/:subMode"
    element={<WebStructue page="basic" />}
  />,
  <Route
    exact
    key={'/admin/basic/:mode'}
    path="/admin/basic/:mode"
    element={<WebStructue page="basic" />}
  />,
  <Route
    key={'/admin/points'}
    path="/admin/points"
    element={<WebStructue page="points" />}
  />,
  <Route
    key={'/admin/levels'}
    path="/admin/levels"
    element={<WebStructue page="levels" />}
  />,
  <Route
    key={'/admin/badges'}
    path="/admin/badges"
    element={<WebStructue page="badges" />}
  />,
  <Route
    key={'/admin/dailyAdv'}
    path="/admin/dailyAdv"
    element={<WebStructue page="dailyAdv" />}
  />,
  <Route
    key={'/admin/exchanges'}
    path="/admin/exchanges"
    element={<WebStructue page="exchanges" />}
  />,
  <Route
    key="/admin/consultants/:mode"
    path="/admin/consultants/:mode"
    element={<WebStructue page="consultants" />}
  />,
];

export default AdminRoutes;
