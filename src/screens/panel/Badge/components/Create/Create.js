import React, {useEffect, useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import {fileRequest, generalRequest} from '../../../../../API/Utility';
import {showError, showSuccess} from '../../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../../styles/Common/Styles';
import {translator} from '../../translate';
import {badgeContext, dispatchBadgeContext} from '../Context';
import BadgePic from './BadgePic';
import Metric from './Metric';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(badgeContext),
    React.useContext(dispatchBadgeContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [title, setTitle] = useState(
    props.isInEditMode ? state.selectedBadge.name : undefined,
  );
  const [lockedImg, setLockedImg] = useState();
  const [unlockedImg, setUnlockedImg] = useState();
  const [actions, setActions] = useState(
    props.isInEditMode ? state.selectedBadge.actions : [],
  );
  const [metric, setMetric] = useState();
  const [count, setCount] = useState();
  const [values, setValues] = useState();
  const [priority, setPriority] = useState(
    props.isInEditMode ? state.selectedBadge.priority : undefined,
  );

  const fetchActions = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(routes.getActions, 'get', undefined, 'data', props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) props.setMode('list');
      dispatch({actions: res[0]});
      setValues(
        res[0].map(e => ({
          id: e.action,
          item: e.actionFa,
        })),
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.actions) {
      setValues(
        state.actions.map(e => ({
          id: e.action,
          item: e.actionFa,
        })),
      );
      return;
    }
    fetchActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.actions]);

  if (!values) return <></>;

  return (
    <CommonWebBox onBackClick={() => props.setMode('list')} backBtn={true}>
      <PhoneView style={{...styles.gap10}}>
        <JustBottomBorderTextInput
          placeholder={translator.title}
          subText={translator.title}
          value={title}
          onChangeText={e => setTitle(e)}
        />
        <JustBottomBorderTextInput
          placeholder={translator.priority}
          subText={translator.priority}
          value={priority}
          onChangeText={e => setPriority(e)}
          justNum={true}
        />
      </PhoneView>
      <MyView style={{...styles.justifyContentCenter, ...styles.borderBottom1}}>
        <SimpleText
          style={{
            ...styles.BlueBold,
            ...styles.fontSize17,
            ...styles.textCenter,
            ...styles.marginBottom20,
          }}
          text={translator.metrics}
        />
        <MyView style={{...styles.gap15}}>
          {actions.length > 0 &&
            actions.map((e, index) => {
              return (
                <Metric
                  key={index}
                  metric={e}
                  onRemove={() =>
                    setActions(actions.filter(itr => itr.action !== e.action))
                  }
                />
              );
            })}
        </MyView>
        {actions.length === 0 && (
          <SimpleText
            style={{
              ...styles.colorRed,
              ...styles.textCenter,
              ...styles.marginBottom20,
            }}
            text={'متریکی افزوده نشده است'}
          />
        )}
      </MyView>

      <MyView style={{...styles.borderBottom1}}>
        <PhoneView style={{...styles.gap10}}>
          <JustBottomBorderSelect
            placeholder={translator.metric}
            subText={translator.metric}
            setter={setMetric}
            values={values}
            value={
              metric === undefined
                ? undefined
                : values.find(elem => elem.id === metric)
            }
          />
          <JustBottomBorderTextInput
            placeholder={translator.count}
            subText={translator.count}
            value={count}
            onChangeText={e => setCount(e)}
            justNum={true}
          />
        </PhoneView>
        <CommonButton
          onPress={() => {
            if (metric === undefined || count === undefined || count === '') {
              showError('لطفا فیلدها را پر نمایید');
              return;
            }
            if (actions.find(e => e.action === metric) !== undefined) {
              showError('این متریک وجود دارد');
              return;
            }
            let tmp = [];
            for (let i = 0; i < actions.length; i++) tmp.push(actions[i]);

            tmp.push({
              count: count,
              action: metric,
              actionFa: state.actions.find(e => e.action === metric).actionFa,
            });

            setActions(tmp);
            setMetric(undefined);
            setCount('');
          }}
          theme={'dark'}
          title={translator.addMetric}
        />
      </MyView>

      <PhoneView style={{gap: '10px'}}>
        <SimpleText text={translator.lockedImg} />
        <BadgePic
          img={props.isInEditMode ? state.selectedBadge.lockedImg : undefined}
          onChange={img => setLockedImg(img)}
        />
      </PhoneView>
      <PhoneView style={{gap: '10px'}}>
        <SimpleText text={translator.unlockedImg} />
        <BadgePic
          img={props.isInEditMode ? state.selectedBadge.unlockedImg : undefined}
          onChange={img => setUnlockedImg(img)}
        />
      </PhoneView>
      <CommonButton
        onPress={async () => {
          if (
            !props.isInEditMode &&
            (lockedImg === undefined || unlockedImg === undefined)
          ) {
            showError('لطفا تصاویر را آپلود نمایید');
            return;
          }
          if (title === undefined) {
            showError('لطفا عنوان را وارد نمایید');
            return;
          }
          if (actions.length === 0) {
            showError('لطفا متریک\u200cهای کسب مدال را مشخص نمایید');
            return;
          }
          if (priority === undefined) {
            showError('لطفا اولویت نمایش را وارد نمایید');
            return;
          }
          props.setLoading(true);

          Promise.all([
            lockedImg
              ? fetch(lockedImg.content).then(res => res.blob())
              : async () => {
                  return 0;
                },
            unlockedImg
              ? fetch(unlockedImg.content).then(res => res.blob())
              : async () => {
                  return 0;
                },
          ]).then(async res => {
            let formData = new FormData();
            if (lockedImg) formData.append('locked', res[0], lockedImg.name);
            if (unlockedImg)
              formData.append('unlocked', res[1], unlockedImg.name);
            const response = await fileRequest(
              props.isInEditMode
                ? routes.updateBadge + state.selectedBadge.id
                : routes.createBadge,
              props.isInEditMode ? 'put' : 'post',
              formData,
              'data',
              props.token,
              {
                name: title,
                priority: priority,
                actions: actions.map(e => ({
                  action: e.action,
                  count: e.count,
                })),
              },
            );
            props.setLoading(false);
            if (response != null) {
              if (props.isInEditMode)
                dispatch({
                  badges: state.badges.map(e => {
                    if (e.id === state.selectedBadge.id) return response;
                    return e;
                  }),
                });
              else dispatch({badges: [...state.badges, response]});
              props.setMode('list');
              showSuccess();
            }
          });
        }}
        theme={'dark'}
        title={'ذخیره'}
      />
    </CommonWebBox>
  );
}

export default Create;
