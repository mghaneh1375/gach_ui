import {Route} from 'react-router-dom';
import WebStructue from '../../screens/WebStructure';

function AdminRoutes() {
  return (
    <Route
      path="admin/stats/general"
      element={<WebStructue page="generalStats" />}
    />
  );
}

export default AdminRoutes;
