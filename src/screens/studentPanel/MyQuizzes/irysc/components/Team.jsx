import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {CommonWebBox, SimpleText} from '@/styles';
import CommonDataTable from '../../../../../styles/common/CommonDataTable.jsx';
import translator from '../../../../panel/quiz/translator';
import {
  dispatchQuizContext,
  quizContext,
} from '../../../../panel/quiz/components/Context.jsx';
import commonTranslator from '@/translator/common';
import {styles} from '@/styles/common/styles';
import {columnsForMember} from '../../../../panel/quiz/components/students/tableStructure';
function Team(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [selectedStudent, setSelectedStudent] = useState();
  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={state.selectedQuiz.title}>
      {selectedStudent !== undefined && selectedStudent.team !== undefined && (
        <>
          <SimpleText
            style={{
              ...styles.BlueBold,
              ...styles.margin15,
            }}
            text={translator.members}
          />

          <CommonDataTable
            groupOps={[
              {
                key: 'setMainMember',
                url:
                  routes.onlineStandingChangeMainMember +
                  state.selectedQuiz.id +
                  '/' +
                  selectedStudent.id,
                method: 'put',
                label: 'انتخاب به عنوان نفر اصلی',
                warning: translator.sureChangeMainMember,
                afterFunc: arr => {
                  state.selectedQuiz.students = undefined;
                  dispatch({
                    selectedQuiz: state.selectedQuiz,
                  });
                  props.setMode('list');
                },
              },
              {
                key: 'removeMember',
                url:
                  routes.onlineStandingRemoveMember +
                  state.selectedQuiz.id +
                  '/' +
                  selectedStudent.id,
                method: 'delete',
                label: 'حذف عضو/اعضا',
                warning: commonTranslator.sureRemove,
                afterFunc: arr => {
                  state.selectedQuiz.students = undefined;
                  dispatch({
                    selectedQuiz: state.selectedQuiz,
                  });
                  props.setMode('list');
                },
              },
            ]}
            setLoading={props.setLoading}
            token={props.token}
            columns={columnsForMember}
            data={selectedStudent.team}
            pagination={false}
            excel={false}
          />
        </>
      )}
    </CommonWebBox>
  );
}
export default Team;
