import React, {useState} from 'react';
import {CommonWebBox, MyView} from '@/styles';
import Translator from '../../translate';
import commonTranslator from '@/translator/common';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import {generalRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import ExcelComma from '@/components/web/ExcelCommaInput.jsx';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import columns from './tableStructure';
import SearchUser from '@/components/web/searchUser/SearchUser.jsx';
import {changeText} from '@/services/utility';
import {contentContext, dispatchContentContext} from '../Context.jsx';
const Students = props => {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [paid, setPaid] = useState();
  const afterAdd = items => {
    if (items === undefined) return;
    setStudents(items.concat(state.selectedContent.students));
  };
  const setStudents = newList => {
    state.selectedContent.students = newList;
    state.selectedContent.studentsCount = newList.length;
    dispatch({
      selectedContent: state.selectedContent,
      needUpdate: true,
    });
  };
  React.useEffect(() => {
    if (isWorking || state.selectedContent.students !== undefined) return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.contentBuyers + state.selectedContent.id,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.setMode('list');
        return;
      }
      state.selectedContent.students = res[0];
      dispatch({
        selectedContent: state.selectedContent,
        needUpdate: true,
      });
      setIsWorking(false);
    });
  }, [props, isWorking, dispatch, state.selectedContent]);
  const [showSearchUser, setShowSearchUser] = useState(false);
  const [foundUser, setFoundUser] = useState();
  return (
    <MyView>
      <MyView>
        <SearchUser
          setFinalResult={setFoundUser}
          setShow={setShowSearchUser}
          token={props.token}
          setLoading={props.setLoading}
          show={showSearchUser}
        />
        <CommonWebBox
          backBtn={true}
          onBackClick={() => props.setMode('list')}
          header={Translator.studentsList}>
          <ExcelComma
            header={Translator.addStudent}
            placeholder={commonTranslator.NIDs}
            help={commonTranslator.NIDHelp}
            newItems={
              foundUser === undefined ? [] : foundUser.map(elem => elem.NID)
            }
            setNewItems={setFoundUser}
            setLoading={props.setLoading}
            onSearchClick={() => setShowSearchUser(true)}
            token={props.token}
            url={routes.contentForceRegistry + state.selectedContent.id}
            afterAddingCallBack={afterAdd}
            additionalData={{
              paid: paid,
            }}
            mandatoryFields={['paid']}>
            <MyView
              style={{
                marginBottom: 10,
              }}>
              <JustBottomBorderTextInput
                justNum={true}
                value={paid}
                onChangeText={e => changeText(e, setPaid)}
                placeholder={commonTranslator.paid}
              />
            </MyView>
          </ExcelComma>
          <CommonDataTable
            columns={columns}
            setData={setStudents}
            removeUrl={routes.contentForceFire + state.selectedContent.id}
            data={state.selectedContent.students}
            token={props.token}
            setLoading={props.setLoading}
          />
        </CommonWebBox>
      </MyView>
    </MyView>
  );
};
export default Students;
