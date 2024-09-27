import React, {useCallback, useEffect, useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../styles/Common';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import RadioButtonYesOrNo from '../../../components/web/RadioButtonYesOrNo';
import commonTranslator from '../../../translator/Common';
import {showSuccess} from '../../../services/Utility';

function ProfileConfig(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [config, setConfig] = useState();

  const fetchData = useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getProfileConfig,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setConfig(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommonWebBox>
      <PhoneView style={{gap: '20px', rowGap: '5px'}}>
        {config && (
          <>
            <PhoneView style={{width: '500px'}}>
              <RadioButtonYesOrNo
                label={'نمایش دوره های آموزشی ثبت نامی'}
                selected={config.showContentPackages ? 'yes' : 'no'}
                setSelected={e => {
                  setConfig(prevValues => ({
                    ...prevValues,
                    showContentPackages: e === 'yes',
                  }));
                }}
              />
            </PhoneView>
            <PhoneView style={{width: '500px'}}>
              <RadioButtonYesOrNo
                label={'نمایش آزمون های ثبت نامی'}
                selected={config.showQuizzes ? 'yes' : 'no'}
                setSelected={e => {
                  setConfig(prevValues => ({
                    ...prevValues,
                    showQuizzes: e === 'yes',
                  }));
                }}
              />
            </PhoneView>
            <PhoneView style={{width: '500px'}}>
              <RadioButtonYesOrNo
                label={'نمایش مشاور من'}
                selected={config.showMyAdvisor ? 'yes' : 'no'}
                setSelected={e => {
                  setConfig(prevValues => ({
                    ...prevValues,
                    showMyAdvisor: e === 'yes',
                  }));
                }}
              />
            </PhoneView>
            <PhoneView style={{width: '500px'}}>
              <RadioButtonYesOrNo
                label={'نمایش معلم های خصوصی من'}
                selected={config.showTeachers ? 'yes' : 'no'}
                setSelected={e => {
                  setConfig(prevValues => ({
                    ...prevValues,
                    showTeachers: e === 'yes',
                  }));
                }}
              />
            </PhoneView>
            <PhoneView style={{width: '500px'}}>
              <RadioButtonYesOrNo
                label={'نمایش نظرات من'}
                selected={config.showMyComments ? 'yes' : 'no'}
                setSelected={e => {
                  setConfig(prevValues => ({
                    ...prevValues,
                    showMyComments: e === 'yes',
                  }));
                }}
              />
            </PhoneView>
            <PhoneView style={{width: '500px'}}>
              <RadioButtonYesOrNo
                label={'نمایش امتیاز دبیران به من'}
                selected={config.showMyRate ? 'yes' : 'no'}
                setSelected={e => {
                  setConfig(prevValues => ({
                    ...prevValues,
                    showMyRate: e === 'yes',
                  }));
                }}
              />
            </PhoneView>
            <PhoneView style={{width: '500px'}}>
              <RadioButtonYesOrNo
                label={'نمایش مقطع من'}
                selected={config.showGrade ? 'yes' : 'no'}
                setSelected={e => {
                  setConfig(prevValues => ({
                    ...prevValues,
                    showGrade: e === 'yes',
                  }));
                }}
              />
            </PhoneView>
            <PhoneView style={{width: '500px'}}>
              <RadioButtonYesOrNo
                label={'نمایش شعبه من'}
                selected={config.showBranch ? 'yes' : 'no'}
                setSelected={e => {
                  setConfig(prevValues => ({
                    ...prevValues,
                    showBranch: e === 'yes',
                  }));
                }}
              />
            </PhoneView>
            <PhoneView style={{width: '500px'}}>
              <RadioButtonYesOrNo
                label={'نمایش مدرسه من'}
                selected={config.showSchool ? 'yes' : 'no'}
                setSelected={e => {
                  setConfig(prevValues => ({
                    ...prevValues,
                    showSchool: e === 'yes',
                  }));
                }}
              />
            </PhoneView>
            <PhoneView style={{width: '500px'}}>
              <RadioButtonYesOrNo
                label={'نمایش شهر من'}
                selected={config.showCity ? 'yes' : 'no'}
                setSelected={e => {
                  setConfig(prevValues => ({
                    ...prevValues,
                    showCity: e === 'yes',
                  }));
                }}
              />
            </PhoneView>
          </>
        )}
      </PhoneView>
      <CommonButton
        onPress={async () => {
          dispatch({loading: true});
          const res = await generalRequest(
            routes.setProfileConfig,
            'put',
            config,
            undefined,
            state.token,
          );
          dispatch({loading: false});
          if (res != null) showSuccess();
        }}
        theme={'dark'}
        title={commonTranslator.confirm}
      />
    </CommonWebBox>
  );
}

export default ProfileConfig;
