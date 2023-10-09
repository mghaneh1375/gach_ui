import React, {useState} from 'react';
import {CommonWebBox} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import translator from '../../Translator';
import {columnsForCopun} from './TableStructure';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';

function Copun(props) {
  const [data, setData] = useState();
  const [isWorking, setIsWorking] = useState(false);

  const fetchData = React.useCallback(() => {
    if (data !== undefined || isWorking) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getShopCopunReport,
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
    <CommonWebBox header={translator.offs} backBtn={true}>
      {data !== undefined && (
        <CommonDataTable columns={columnsForCopun} data={data} />
      )}
    </CommonWebBox>
  );
}

export default Copun;
