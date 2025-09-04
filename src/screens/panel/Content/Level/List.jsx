import React, {useEffect, useState} from 'react';
import {generalRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import {CommonWebBox, MyView} from '@/styles';
import CommonDataTable from '../../../../styles/common/CommonDataTable.jsx';
import Ops from './Ops.jsx';
function List(props) {
  const [levels, setLevels] = useState();
  const [selectedLevel, setSelectedLevel] = useState();
  const columns = [
    {
      name: 'عنوان',
      selector: row => row.title,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'آیکون',
      cell: (row, index) => {
        return (
          <img
            style={{
              width: '100px',
              height: '100px',
            }}
            key={'pic_' + index}
            resizeMode="contain"
            src={row.icon}
          />
        );
      },
    },
  ];
  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getListOfPackageLevels,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setLevels(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [showOp, setShowOp] = useState(false);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOp = (_, row) => {
    setSelectedLevel(row);
    setShowOp(true);
  };
  return (
    <MyView>
      {showOp && (
        <Ops
          setSelectedLevel={() => props.setSelectedLevel(selectedLevel)}
          setMode={props.setMode}
          toggleShowPopUp={() => setShowOp(!showOp)}
        />
      )}
      <CommonWebBox
        header={'سطوح'}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        {levels !== undefined && (
          <CommonDataTable
            excel={false}
            pagination={false}
            removeUrl={routes.removePackageLevel}
            handleOp={handleOp}
            setLoading={props.setLoading}
            columns={columns}
            data={levels}
            token={props.token}
            setData={newData => setLevels(newData)}
          />
        )}
      </CommonWebBox>
    </MyView>
  );
}
export default List;
