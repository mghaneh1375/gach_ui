import React, {useState} from 'react';
import {routes} from '../../../../../../API/APIRoutes';
import {removeItems} from '../../../../../../services/Utility';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import Ops from '../Ops';
import columns from './TableStructure';
import commonTranslator from '../../../../../../translator/Common';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../../../styles/Common/Styles';
import {generalRequest} from '../../../../../../API/Utility';

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
        <PhoneView style={{...styles.gap10}}>
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
        <PhoneView style={{justifyContent: 'end'}}>
          <CommonButton
            onPress={async () => {
              let query = new URLSearchParams();
              if (searchKey !== undefined) query.append('subject', searchKey);
              if (code !== undefined) query.append('code', code);

              props.setLoading(true);
              let res = await generalRequest(
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
