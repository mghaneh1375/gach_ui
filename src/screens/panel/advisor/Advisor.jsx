import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {routes} from '@/api/apiRoutes';
import {getUser, setCacheItem} from '@/api/user';
import {generalRequest} from '@/api/utility';
import {formatPrice} from '@/services/utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles';
import commonTranslator from '@/translator/common';
import React, {useCallback, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {useParams} from 'react-router';
import Titr from '../quiz/components/Titr';
import RecentComment from './components/RecentComment';
import {Translate} from './translate';
import StudentDigestCardSnake from '@/components/web/StudentDigestCardSnake';

function Advisor() {
  const param = useParams();
  const [data, setData] = useState();
  const [pic, setPic] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const fetchData = useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchAdvisorGeneralInfo + param.advisorId,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0]) setData(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.advisorId]);

  useEffect(() => {
    if (!param.advisorId) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.advisorId]);

  useEffect(() => {
    if (!data) return;
    setPic(data.pic);
  }, [data]);

  return (
    <>
      <CommonWebBox
        header={Translate.advisorInfo}
        btn={
          <PhoneView style={{gap: 10}}>
            <CommonButton
              title={Translate.enter}
              onPress={async () => {
                dispatch({loading: true});
                const res = await generalRequest(
                  routes.adminLogin + param.advisorId,
                  'post',
                  undefined,
                  ['user', 'token'],
                  state.token,
                );
                dispatch({loading: false});
                if (res !== null) {
                  await setCacheItem('token_sec', state.token);
                  const adminUser = await getUser();
                  await setCacheItem('user_sec', adminUser);
                  await setCacheItem('token', res.token);
                  await setCacheItem('user', JSON.stringify(res.user));
                  window.location.href = '/';
                }
                return false;
              }}
            />
          </PhoneView>
        }>
        <PhoneView style={{gap: 20, alignItems: 'center'}}>
          {data && (
            <MyView style={{gap: 5, alignItems: 'center'}}>
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
              <SimpleText
                style={{fontSize: 11}}
                text={`${data.firstname} ${data.lastname}`}
              />
              {data.age && (
                <SimpleText
                  style={{fontSize: 11}}
                  text={`${commonTranslator.age} ${data.age}`}
                />
              )}
              {data.studentsCount && (
                <SimpleText
                  style={{fontSize: 11}}
                  text={`${Translate.studentsCount}: ${data.studentsCount}`}
                />
              )}
              <SimpleText
                style={{fontSize: 11}}
                text={`${Translate.totalStudentsCount}: ${data.totalStudentsCount}`}
              />
              <SimpleText
                style={{fontSize: 11}}
                text={`${Translate.commentsCount}: ${data.commentsCount}`}
              />
              <SimpleText
                style={{fontSize: 11}}
                text={`${Translate.meetingCount}: ${data.meetingCount}`}
              />
              <SimpleText
                style={{fontSize: 11}}
                text={`${Translate.reportsCount}: ${data.reportsCount}`}
              />
              <SimpleText
                style={{fontSize: 11}}
                text={`${Translate.totalSettlements}: ${data.totalSettlements}`}
              />
              <SimpleText
                style={{fontSize: 11}}
                text={`${Translate.totalSettledAmount}: ${formatPrice(
                  data.totalSettledAmount,
                )}`}
              />
              <SimpleText
                style={{fontSize: 11}}
                text={`${Translate.schedulesCount}: ${data.schedulesCount}`}
              />
              <SimpleText
                style={{fontSize: 11}}
                text={`${commonTranslator.rate}: ${data.rate}`}
              />
              <SimpleText
                style={{fontSize: 11}}
                text={`${Translate.ratesCount}: ${data.rateCount}`}
              />
              {data.tags && data.tags.map(e => '#' + e).join(' - ')}
            </MyView>
          )}

          <MyView>
            {data?.adviceBio && <SimpleText text={data.adviceBio} />}
            {data?.adviceVideoLink && (
              <a href={data.adviceVideoLink}>{Translate.videoLink}</a>
            )}
          </MyView>
        </PhoneView>
        {data?.students && data.students.length > 0 && (
          <>
            <Titr title={Translate.currentStudents} />
            <PhoneView style={{gap: 10}}>
              {data.students.map((std, index) => {
                return (
                  <StudentDigestCardSnake
                    student={std}
                    isInPhone={state.isInPhone}
                    key={index}
                  />
                );
              })}
            </PhoneView>
          </>
        )}
        {data?.recentComments && data?.recentComments.length > 0 && (
          <>
            <Titr title={Translate.recentComments} />
            {data.recentComments.map((comment, index) => (
              <RecentComment comment={comment} key={index} />
            ))}
          </>
        )}
        {data?.recentReports && data?.recentReports.length > 0 && (
          <>
            <Titr title={Translate.recentReports} />
            {data.recentReports.map((report, index) => (
              <RecentComment report={report} key={index} />
            ))}
          </>
        )}
        {/* display forms */}
      </CommonWebBox>
    </>
  );
}

export default Advisor;
