import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import Translator from '../../Translate';
import commonTranslator from '../../../../../translator/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import ExcelComma from '../../../../../components/web/ExcelCommaInput';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import columns from './TableStructure';
import SearchUser from '../../../../../components/web/SearchUser/SearchUser';
import {changeText} from '../../../../../services/Utility';
import {contentContext, dispatchContentContext} from '../Context';

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
    dispatch({selectedContent: state.selectedContent, needUpdate: true});
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
      dispatch({selectedContent: state.selectedContent, needUpdate: true});
      setIsWorking(false);
    });
  }, [props, isWorking, dispatch, state.selectedContent]);

  const [showSearchUser, setShowSearchUser] = useState(false);
  const [foundUser, setFoundUser] = useState();
  const [studentIdx, setStudentIdx] = useState();

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
            additionalData={{paid: paid}}
            mandatoryFields={['paid']}>
            <MyView style={{marginBottom: 10}}>
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
            data={state.selectedContent.students}
            setLoading={props.setLoading}
          />
        </CommonWebBox>
      </MyView>
    </MyView>
  );
};

export default Students;
