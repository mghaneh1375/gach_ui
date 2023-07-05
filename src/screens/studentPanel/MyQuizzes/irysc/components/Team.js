import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import {CommonWebBox, SimpleText} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import translator from '../../../../panel/quiz/Translator';
import {
  dispatchQuizContext,
  quizContext,
} from '../../../../panel/quiz/components/Context';
import commonTranslator from '../../../../../translator/Common';
import {styles} from '../../../../../styles/Common/Styles';
import {columnsForMember} from '../../../../panel/quiz/components/Students/TableStructure';
import {generalRequest} from '../../../../../API/Utility';

function Team(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState();

  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={state.selectedQuiz.title}>
      {selectedStudent !== undefined && selectedStudent.team !== undefined && (
        <>
          <SimpleText
            style={{...styles.BlueBold, ...styles.margin15}}
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
                  dispatch({selectedQuiz: state.selectedQuiz});
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
                  dispatch({selectedQuiz: state.selectedQuiz});
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
