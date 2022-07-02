import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
} from '../../../../styles/Common';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import {View} from 'react-native';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import ForceRegistry from './ForceRegistry';

const Students = props => {
  const [data, setData] = useState(undefined);
  const [isWorking, setIsWorking] = useState(false);
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [showForceRegistryPopUp, setShowForceRegistryPopUp] = useState(false);
  const [selectedSudent, setSelectedStudent] = useState(undefined);

  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const toggleShowForceRegistryPopUp = () => {
    setShowForceRegistryPopUp(!showForceRegistryPopUp);
  };

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const removeStudent = () => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.forceDeportation + props.quiz.generalMode + '/' + props.quiz.id,
        'delete',
        {
          students: [selectedSudent.student.id],
        },
        undefined,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        for (let i = 0; i < props.quiz.students.length; i++) {
          if (props.quiz.students[i].id === selectedSudent.id) {
            props.quiz.students.splice(i, 1);
            props.updateQuiz(props.quiz);
            break;
          }
        }
        toggleShowOpPopUp();
      }
    });
  };

  const columns = [
    {
      name: 'نام دانش آموز',
      selector: row => row.student.name,
    },
    {
      name: 'کد ملی',
      selector: row => row.student.NID,
    },
    {
      name: 'تلفن همراه',
      selector: row => row.student.phone,
    },
    {
      name: 'ایمیل',
      selector: row => row.student.mail,
    },
    {
      name: 'تاریخ ثبت نام',
      selector: row => row.registerAt,
      grow: 4,
      style: {
        minWidth: '200px !important',
      },
    },
    {
      name: 'مبلغ پرداختی',
      selector: row => row.paid,
    },
  ];

  React.useEffect(() => {
    if (!isWorking && props.quiz.students === undefined) {
      setIsWorking(true);
      props.setLoading(true);

      Promise.all([
        generalRequest(
          props.quiz.generalMode === 'IRYSC'
            ? routes.getIRYSCParticipants + props.quiz.id
            : routes.getSchoolParticipants + props.quiz.id,
          'get',
          undefined,
          'students',
          props.token,
        ),
      ]).then(res => {
        props.setLoading(false);
        if (res[0] === null) {
          props.setMode('list');
          return;
        }

        props.quiz.students = res[0];
        props.updateQuiz(props.quiz);
        setData(props.quiz.students);
        setIsWorking(false);
      });
    } else setData(props.quiz.students);
  }, [props, isWorking]);

  const handleOp = idx => {
    setSelectedStudent(props.quiz.students[idx]);
    toggleShowOpPopUp();
  };

  return (
    <View>
      {showForceRegistryPopUp && (
        <ForceRegistry
          setLoading={props.setLoading}
          toggleShowPopUp={toggleShowForceRegistryPopUp}
          setMode={props.setMode}
          token={props.token}
          quiz={props.quiz}
          updateQuiz={props.updateQuiz}
        />
      )}
      {showOpPopUp && (
        <LargePopUp
          toggleShowPopUp={toggleShowOpPopUp}
          title={props.quiz.title}>
          <PhoneView style={{flexWrap: 'wrap'}}>
            <CommonButton
              onPress={() => removeStudent()}
              dir={'rtl'}
              theme={'transparent'}
              title={translator.deleteStudent}
            />
          </PhoneView>
        </LargePopUp>
      )}
      <CommonWebBox
        header={translator.studentsListInQuiz}
        child={
          <View>
            <EqualTwoTextInputs>
              <TextIcon
                onPress={() => toggleShowForceRegistryPopUp()}
                theme={'rect'}
                text={translator.addStudent}
                icon={faPlus}
                style={{width: 250}}
              />
              <CommonButton
                onPress={() => changeMode('list')}
                title={commonTranslator.cancel}
              />
            </EqualTwoTextInputs>
            <CommonDataTable
              columns={columns}
              data={data}
              handleOp={handleOp}
            />
          </View>
        }
      />
    </View>
  );
};

export default Students;
