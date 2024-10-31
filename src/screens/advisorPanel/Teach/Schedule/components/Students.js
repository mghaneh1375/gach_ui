import React, {useState} from 'react';
import {Rating} from 'react-native-ratings';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {getSimpleCurrTime, showSuccess} from '../../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {dispatchTeachScheduleContext, teachScheduleContext} from './Context';
import {studentsColumns} from './TableStructure';
import Translator from './Translator';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../translator/Common';

function Students(props) {
  const useGlobalState = () => [
    React.useContext(teachScheduleContext),
    React.useContext(dispatchTeachScheduleContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [students, setStudents] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [showOp, setShowOp] = useState(false);
  const [canRate, setCanRate] = useState(false);
  const [tags, setTags] = useState();
  const [desc, setDesc] = useState();
  const [showReportPane, setShowReportPane] = useState(false);

  const fetchReport = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getMyTeachScheduleReportProblemsForTeacher +
          state.selectedScheduleId,
        'get',
        undefined,
        'data',
        props.token,
      ),
      generalRequest(
        routes.getTeachAllReportTags,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null || res[1] === null) {
        setShowReportPane(false);
        return;
      }
      setTags(
        res[1].map(e => ({
          ...{isSelected: res[0].tags.indexOf(e.label) !== -1},
          ...e,
        })),
      );
      setDesc(res[0].desc);
      setShowReportPane(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedScheduleId]);

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getScheduleStudents + state.selectedScheduleId,
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
      setStudents(res[0].students);
      setCanRate(res[0].canRate);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedScheduleId]);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedScheduleId]);

  const handleOp = (idx, row) => {
    setSelectedRow(row);
    setShowOp(true);
  };

  return (
    <>
      {!showOp && (
        <CommonWebBox
          backBtn={true}
          onBackClick={() => props.setMode('list')}
          header={Translator.studentsList}>
          {students && (
            <CommonDataTable
              excel={false}
              pagination={false}
              handleOp={handleOp}
              columns={studentsColumns}
              data={students}
            />
          )}
        </CommonWebBox>
      )}
      {showOp && (
        <LargePopUp
          title={'عملیات'}
          toggleShowPopUp={() => {
            setShowOp(false);
            setShowReportPane(false);
            setSelectedRow(undefined);
          }}>
          <PhoneView style={{gap: '10px'}}>
            <CommonButton
              onPress={() =>
                window.open(
                  'studentEducationalHistory/' + selectedRow.student.id,
                )
              }
              theme={'transparent'}
              title={Translator.seeStudentProfile}
            />
            <CommonButton
              onPress={() => {
                if (tags !== undefined) setShowReportPane(true);
                else fetchReport();
              }}
              theme={'transparent'}
              title={Translator.report}
            />
          </PhoneView>
          {showReportPane && (
            <>
              {tags && (
                <PhoneView style={{gap: '10px'}}>
                  {tags.map((e, index) => {
                    return (
                      <CommonButton
                        theme={e.isSelected ? 'dark' : 'transparent'}
                        key={index}
                        title={e.label}
                        onPress={() =>
                          setTags(
                            tags.map(ee => {
                              if (e.id === ee.id)
                                ee.isSelected = !ee.isSelected;
                              return ee;
                            }),
                          )
                        }
                      />
                    );
                  })}
                </PhoneView>
              )}
              <JustBottomBorderTextInput
                multiline={true}
                value={desc}
                onChangeText={e => setDesc(e)}
                placeholder={commonTranslator.desc}
                subText={commonTranslator.optional}
              />
              <CommonButton
                theme={'dark'}
                onPress={async () => {
                  props.setLoading(true);
                  const selectedTags = tags.filter(e => e.isSelected);
                  const res = await generalRequest(
                    routes.setMyTeachScheduleReportProblemsForTeacher +
                      state.selectedScheduleId +
                      '/' +
                      selectedRow.student.id,
                    'put',
                    {
                      tagIds:
                        selectedTags.length === 0
                          ? []
                          : selectedTags.map(e => e.id),
                      desc:
                        desc === undefined || desc.length === 0
                          ? undefined
                          : desc,
                    },
                    undefined,
                    props.token,
                  );
                  props.setLoading(false);
                  if (res !== null) {
                    showSuccess();
                    setShowReportPane(false);
                  }
                }}
                title={commonTranslator.confirm}
              />
            </>
          )}
          {canRate && (
            <PhoneView
              style={{gap: '10px', alignItems: 'center', marginTop: '20px'}}>
              <SimpleText text={'امتیاز شما به دانش آموز'} />
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                fractions={0}
                onFinishRating={async rate => {
                  props.setLoading(true);
                  const res = await generalRequest(
                    routes.rateToTeachSchedulesStudent +
                      state.selectedScheduleId +
                      '/' +
                      selectedRow.student.id +
                      '?rate=' +
                      rate,
                    'put',
                    undefined,
                    undefined,
                    props.token,
                  );
                  props.setLoading(false);
                  if (res != null) {
                    showSuccess();
                    setStudents(
                      students.map(e => {
                        if (e.student.id === selectedRow.student.id) {
                          e.teacherToStdRate = rate;
                          e.teacherToStdRateAt = getSimpleCurrTime();
                        }
                        return e;
                      }),
                    );
                  }
                }}
                style={{
                  direction: 'ltr',
                  cursor: 'pointer',
                }}
                startingValue={selectedRow.teacherToStdRate}
              />
            </PhoneView>
          )}
        </LargePopUp>
      )}
    </>
  );
}

export default Students;
