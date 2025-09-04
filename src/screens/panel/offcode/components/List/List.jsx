import React, {useState} from 'react';
import {CommonButton, CommonWebBox, MyView, PhoneView} from '@/styles';
import CommonDataTable from '../../../../../styles/common/CommonDataTable.jsx';
import Ops from '../Ops.jsx';
import translator from '../../translator';
import columns from './tableStructure';
import Filter from './Filter.jsx';
import {routes} from '@/api/apiRoutes';

const List = props => {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedOff(props.offs[idx]);
    toggleShowOpPopUp();
  };
  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          off={props.selectedOff}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          updateOff={props.updateOff}
          setMode={props.setMode}
          removeOffs={props.removeOffs}
        />
      )}
      <CommonWebBox
        header={translator.offs}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <MyView>
          <Filter
            setData={props.setData}
            token={props.token}
            setLoading={props.setLoading}
          />
          <PhoneView>
            <CommonButton
              onPress={() => props.setMode('copun')}
              theme={'dark'}
              title={'گزارش کوپن‌های فروشگاه'}
            />
            <CommonButton
              onPress={() => props.setMode('copunRev')}
              theme={'orangeRed'}
              title={'گزارش خرید‌های فروشگاه'}
            />
          </PhoneView>
          <CommonDataTable
            columns={columns}
            data={props.offs}
            setData={props.setData}
            handleOp={handleOp}
            removeUrl={routes.removeOffs}
            token={props.token}
            setLoading={props.setLoading}
          />
        </MyView>
      </CommonWebBox>
    </MyView>
  );
};
export default List;
