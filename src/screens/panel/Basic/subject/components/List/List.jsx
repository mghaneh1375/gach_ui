import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {removeItems} from '../../../../../../services/utility';
import CommonDataTable from '../../../../../../styles/common/CommonDataTable.jsx';
import Ops from '../Ops.jsx';
import columns from './tableStructure';
import commonTranslator from '../../../../../../translator/common';
import {CommonButton, CommonWebBox, MyView, PhoneView} from '@/styles';
import JustBottomBorderTextInput from '../../../../../../styles/common/JustBottomBorderTextInput.jsx';
import {styles} from '../../../../../../styles/common/styles';
import {generalRequest} from '../../../../../../api/utility';
function List(props) {
  const [showOpModel, setShowOpModel] = useState();
  const [selected, setSelected] = useState();
  const [searchKey, setSearchKey] = useState();
  const [code, setCode] = useState();
  const toggleShowOpPopUp = () => {
    setShowOpModel(!showOpModel);
  };
  const handleOp = idx => {
    props.setSelectedSubject(props.subjects[idx]);
    setSelected(props.subjects[idx]);
    toggleShowOpPopUp();
  };
  const [data, setData] = useState();
  React.useEffect(() => {
    setData(props.subjects);
  }, [props.subjects]);
  return (
    <CommonWebBox
      header={commonTranslator.subjectDefinition}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      {showOpModel && (
        <Ops
          subject={selected}
          token={props.token}
          setLoading={props.setLoading}
          changeMode={mode => props.setMode(mode)}
          toggleShowPopUp={toggleShowOpPopUp}
          afterDelete={ids => {
            removeItems(props.subjects, props.setSubjects, ids);
            toggleShowOpPopUp();
          }}
        />
      )}
      <MyView>
        <PhoneView
          style={{
            ...styles.gap10,
          }}>
          <JustBottomBorderTextInput
            value={searchKey}
            onChangeText={e => setSearchKey(e)}
            placeholder={'نام حیطه'}
            subText={'نام حیطه'}
          />
          <JustBottomBorderTextInput
            value={code}
            justNum={true}
            onChangeText={e => setCode(e)}
            placeholder={'کد حیطه'}
            subText={'کد حیطه'}
          />
        </PhoneView>
        <PhoneView
          style={{
            justifyContent: 'end',
          }}>
          <CommonButton
            onPress={async () => {
              const query = new URLSearchParams();
              if (searchKey !== undefined) query.append('subject', searchKey);
              if (code !== undefined) query.append('code', code);
              props.setLoading(true);
              const res = await generalRequest(
                routes.fetchSubjects + '?' + query.toString(),
                'get',
                undefined,
                'data',
                props.token,
              );
              props.setLoading(false);
              if (res !== null) setData(res);
            }}
            title={commonTranslator.search}
          />
          <CommonButton
            onPress={async () => {
              props.setMode('groupEdit');
            }}
            theme={'dark'}
            title={'ویرایش دسته جمعی'}
          />
        </PhoneView>
      </MyView>
      {data !== undefined && (
        <CommonDataTable
          columns={columns}
          data={data}
          setData={newData => {
            setData(newData);
            props.setSubjects(newData);
          }}
          token={props.token}
          setLoading={props.setLoading}
          handleOp={handleOp}
          removeUrl={routes.removeSubjects}
        />
      )}
    </CommonWebBox>
  );
}
export default List;
