import React, {useEffect, useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {useParams} from 'react-router';
import {styles} from '../../../styles/Common/Styles';
import {Image} from 'react-native';
import vars from '../../../styles/root';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import ContentCard from '../../general/Packages/components/Card';
import CommentCard from './CommentCard';
import TeacherCard from './TeacherCard';
import BadgeCard from './../../general/Badge/Card';
import Card from '../../panel/quiz/components/Card/Card';

function StudentProfile(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const studentId = useParams().studentId;
  const [state, dispatch] = useGlobalState();
  const [info, setInfo] = useState();
  const [pic, setPic] = useState();
  const [showBadges, setShowBadges] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const [showAdvisors, setShowAdvisors] = useState(false);
  const [showTeachers, setShowTeachers] = useState(false);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [contents, setContents] = useState();
  const [advisors, setAdvisors] = useState();
  const [teachers, setTeachers] = useState();
  const [comments, setComments] = useState();
  const [quizzes, setQuizzes] = useState();
  const [badges, setBadges] = useState();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getStudentProfile + studentId,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) props.navigate('/');
      setInfo(res[0]);
      setPic(res[0].pic);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  useEffect(() => {
    if (studentId === undefined) props.navigate('/');
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  return (
    <>
      <CommonWebBox>
        {info && (
          <>
            <EqualTwoTextInputs
              style={{
                ...styles.justifyContentCenter,
                ...styles.paddingRight15,
                backgroundColor: vars.YELLOW_WHITE,
                borderRadius: 5,
                height: 40,
                marginRight: 0,
              }}>
              <SimpleText
                style={{
                  ...styles.BlueBold,
                  ...styles.fontSize15,
                  ...styles.alignSelfCenter,
                }}
                text={info.name}
              />
            </EqualTwoTextInputs>

            <PhoneView
              style={{
                maxWidth: state.isInPhone ? '100%' : '520px',
                minWidth: state.isInPhone ? '100%' : '520px',
                flexDirection: state.isInPhone ? 'column' : 'row',
                gap: '10px',
              }}>
              <MyView
                style={{
                  border: state.isInPhone ? 'unset' : '4px solid',
                  borderColor: vars.ORANGE,
                  borderRadius: 7,
                  width: state.isInPhone ? 100 : 148,
                  height: state.isInPhone ? 100 : 148,
                }}>
                <Image
                  style={{
                    width: state.isInPhone ? 90 : 140,
                    height: state.isInPhone ? 90 : 140,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  source={pic}
                />
              </MyView>

              <MyView>
                {info.grade && <SimpleText text={'مقطع: ' + info.grade} />}
                {info.branches && (
                  <SimpleText text={'رشته المپیادی: ' + info.branches} />
                )}
                {info.city && <SimpleText text={'شهر: ' + info.city} />}
                {info.school && <SimpleText text={'مدرسه: ' + info.school} />}
                <SimpleText text={'سطح: ' + info.level} />
                <SimpleText text={'امتیاز: ' + info.point} />
              </MyView>
            </PhoneView>
          </>
        )}
        <MyView style={{gap: 0}}>
          {info && info.showContentPackages && (
            <CommonWebBox
              btn={
                <SimpleFontIcon
                  onPress={async () => {
                    if (showContents) {
                      setShowContents(false);
                      return;
                    }
                    if (contents === undefined) {
                      dispatch({loading: true});
                      const res = await generalRequest(
                        routes.getStudentContents + studentId,
                        'get',
                        undefined,
                        'data',
                        state.token,
                      );
                      dispatch({loading: false});
                      if (res !== null) setContents(res);
                    }
                    setShowContents(true);
                  }}
                  kind={'normal'}
                  icon={showContents ? faAngleDown : faAngleUp}
                />
              }
              header={'معرفی بسته\u200cهای آموزشی'}>
              {showContents && (
                <PhoneView style={{...styles.gap10}}>
                  {contents &&
                    contents.map((elem, index) => {
                      return (
                        <ContentCard
                          isInMyMode={false}
                          isInPhone={state.isInPhone}
                          key={index}
                          package={elem}
                          navigate={props.navigate}
                        />
                      );
                    })}
                </PhoneView>
              )}
            </CommonWebBox>
          )}
          {info && info.showAdvisors && (
            <CommonWebBox
              btn={
                <SimpleFontIcon
                  onPress={async () => {
                    if (showAdvisors) {
                      setShowAdvisors(false);
                      return;
                    }
                    if (advisors === undefined) {
                      dispatch({loading: true});
                      const res = await generalRequest(
                        routes.getStudentAdvisors + studentId,
                        'get',
                        undefined,
                        'data',
                        state.token,
                      );
                      dispatch({loading: false});
                      if (res !== null) setAdvisors(res);
                    }
                    setShowAdvisors(true);
                  }}
                  kind={'normal'}
                  icon={showAdvisors ? faAngleDown : faAngleUp}
                />
              }
              header={'مشاوران'}>
              {showAdvisors && (
                <PhoneView style={{...styles.gap10}}>
                  {advisors &&
                    advisors.map((elem, index) => {
                      return <TeacherCard key={index} teacher={elem} />;
                    })}
                </PhoneView>
              )}
            </CommonWebBox>
          )}
          {info && info.showTeachers && (
            <CommonWebBox
              btn={
                <SimpleFontIcon
                  onPress={async () => {
                    if (showTeachers) {
                      setShowTeachers(false);
                      return;
                    }
                    if (teachers === undefined) {
                      dispatch({loading: true});
                      const res = await generalRequest(
                        routes.getStudentTeachers + studentId,
                        'get',
                        undefined,
                        'data',
                        state.token,
                      );
                      dispatch({loading: false});
                      if (res !== null) setTeachers(res);
                    }
                    setShowTeachers(true);
                  }}
                  kind={'normal'}
                  icon={showTeachers ? faAngleDown : faAngleUp}
                />
              }
              header={'دبیران'}>
              {showTeachers && (
                <PhoneView style={{...styles.gap10}}>
                  {teachers &&
                    teachers.map((elem, index) => {
                      return <TeacherCard key={index} teacher={elem} />;
                    })}
                </PhoneView>
              )}
            </CommonWebBox>
          )}
          {info && info.showTeachers && (
            <CommonWebBox
              btn={
                <SimpleFontIcon
                  onPress={async () => {
                    if (showQuizzes) {
                      setShowQuizzes(false);
                      return;
                    }
                    if (quizzes === undefined) {
                      dispatch({loading: true});
                      const res = await generalRequest(
                        routes.getStudentQuizzes + studentId,
                        'get',
                        undefined,
                        'data',
                        state.token,
                      );
                      dispatch({loading: false});
                      if (res !== null) setQuizzes(res);
                    }
                    setShowQuizzes(true);
                  }}
                  kind={'normal'}
                  icon={showQuizzes ? faAngleDown : faAngleUp}
                />
              }
              header={'آزمون ها'}>
              {showQuizzes && (
                <PhoneView style={{...styles.gap10}}>
                  {quizzes &&
                    quizzes.map((elem, index) => {
                      return (
                        <Card
                          isStudent={true}
                          quiz={elem}
                          afterQuiz={false}
                          key={index}
                        />
                      );
                    })}
                </PhoneView>
              )}
            </CommonWebBox>
          )}
          {info && info.showComments && (
            <CommonWebBox
              btn={
                <SimpleFontIcon
                  onPress={async () => {
                    if (showComments) {
                      setShowComments(false);
                      return;
                    }
                    if (comments === undefined) {
                      dispatch({loading: true});
                      const res = await generalRequest(
                        routes.getStudentComments + studentId,
                        'get',
                        undefined,
                        'data',
                        state.token,
                      );
                      dispatch({loading: false});
                      if (res !== null) setComments(res);
                    }
                    setShowComments(true);
                  }}
                  kind={'normal'}
                  icon={showComments ? faAngleDown : faAngleUp}
                />
              }
              header={'نظرات'}>
              {showComments && (
                <PhoneView style={{...styles.gap10}}>
                  {comments &&
                    comments.map((elem, index) => (
                      <CommentCard comment={elem} key={index} />
                    ))}
                </PhoneView>
              )}
            </CommonWebBox>
          )}
          {info && (
            <CommonWebBox
              btn={
                <SimpleFontIcon
                  onPress={async () => {
                    if (showBadges) {
                      setShowBadges(false);
                      return;
                    }
                    if (badges === undefined) {
                      dispatch({loading: true});
                      const res = await generalRequest(
                        routes.getStudentBadges + studentId,
                        'get',
                        undefined,
                        'data',
                        state.token,
                      );
                      dispatch({loading: false});
                      if (res !== null) setBadges(res);
                    }
                    setShowBadges(true);
                  }}
                  kind={'normal'}
                  icon={showBadges ? faAngleDown : faAngleUp}
                />
              }
              header={'مدال ها'}>
              {showBadges && (
                <PhoneView style={{...styles.gap10}}>
                  {badges &&
                    badges.map((elem, index) => (
                      <BadgeCard
                        badge={elem}
                        key={index}
                        isInPhone={state.isInPhone}
                      />
                    ))}
                </PhoneView>
              )}
            </CommonWebBox>
          )}
        </MyView>
      </CommonWebBox>
    </>
  );
}

export default StudentProfile;
