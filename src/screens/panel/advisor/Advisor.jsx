import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles';
import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {Translate} from './translate';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {generalRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import commonTranslator from '@/translator/common';
import {getUser, setCacheItem} from '@/api/user';
import {Image} from 'react-native';

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
              <SimpleText
                style={{fontSize: 11}}
                text={`${Translate.studentsCount}: ${data.studentsCount}`}
              />
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
                text={`${commonTranslator.rate}: ${data.rate}`}
              />
              <SimpleText
                style={{fontSize: 11}}
                text={`${Translate.ratesCount}: ${data.rateCount}`}
              />
            </MyView>
          )}

          <MyView>
            {data?.adviceBio && <SimpleText text={data.adviceBio} />}
          </MyView>
        </PhoneView>
      </CommonWebBox>
    </>
  );
}

export default Advisor;
