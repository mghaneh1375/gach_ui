import React, {useState} from 'react';
import {CommonWebBox} from '@/styles';
import CommonDataTable from '../../../../../styles/common/CommonDataTable.jsx';
import translator from '../../translator';
import {columnsForCopunRev} from './tableStructure';
import {generalRequest} from '../../../../../api/utility';
import {routes} from '@/api/apiRoutes';
function CopunRev(props) {
  const [data, setData] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const fetchData = React.useCallback(() => {
    if (data !== undefined || isWorking) return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getShopCopunRevReport,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) {
        props.setMode('list');
        return;
      }
      setData(res[0]);
      setIsWorking(false);
    });
  }, [props, isWorking, data]);
  React.useEffect(() => {
    if (data === undefined) fetchData();
  }, [data, fetchData]);
  return (
    <CommonWebBox
      onBackClick={() => props.setMode('list')}
      header={translator.offs}
      backBtn={true}>
      {data !== undefined && (
        <CommonDataTable columns={columnsForCopunRev} data={data} />
      )}
    </CommonWebBox>
  );
}
export default CopunRev;
