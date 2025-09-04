import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showError, showSuccess} from '../../../../services/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../styles/Common/Styles';
import translator from '../translator';
import {dispatchLevelContext, levelContext} from './Context';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(levelContext),
    React.useContext(dispatchLevelContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [minPoint, setMinPoint] = useState(
    props.updateMode ? state.selectedLevel.minPoint : undefined,
  );
  const [maxPoint, setMaxPoint] = useState(
    props.updateMode ? state.selectedLevel.maxPoint : undefined,
  );
  const [name, setName] = useState(
    props.updateMode ? state.selectedLevel.name : undefined,
  );
  const [coin, setCoin] = useState(
    props.updateMode ? state.selectedLevel.coin : undefined,
  );

  return (
    <CommonWebBox onBackClick={() => props.setMode('list')} backBtn={true}>
      <PhoneView style={{...styles.gap10}}>
        <JustBottomBorderTextInput
          placeholder={translator.title}
          subText={translator.title}
          value={name}
          onChangeText={e => setName(e)}
        />
        <JustBottomBorderTextInput
          placeholder={translator.minPoint}
          subText={translator.minPoint}
          value={minPoint}
          onChangeText={e => setMinPoint(e)}
          justNum={true}
        />
        <JustBottomBorderTextInput
          placeholder={translator.maxPoint}
          subText={translator.maxPoint}
          value={maxPoint}
          onChangeText={e => setMaxPoint(e)}
          justNum={true}
        />
        <JustBottomBorderTextInput
          placeholder={translator.coin}
          subText={translator.coin}
          value={coin}
          onChangeText={e => setCoin(e)}
          justNum={true}
          float={true}
        />
      </PhoneView>

      <CommonButton
        onPress={async () => {
          if (
            name === undefined ||
            minPoint === undefined ||
            maxPoint === undefined ||
            coin === undefined
          ) {
            showError('لطفا تمام موارد را وارد نمایید');
            return;
          }
          props.setLoading(true);

          const response = await generalRequest(
            props.updateMode
              ? routes.updateLevel + state.selectedLevel.id
              : routes.createLevel,
            props.updateMode ? 'put' : 'post',
            {
              name: name,
              minPoint: minPoint,
              maxPoint: maxPoint,
              coin: coin,
            },
            'data',
            props.token,
          );
          props.setLoading(false);
          if (response != null) {
            if (props.updateMode)
              dispatch({needUpdate: true, selectedLevel: response});
            else dispatch({levels: [...state.levels, response]});
            props.setMode('list');
            showSuccess();
          }
        }}
        theme={'dark'}
        title={'ذخیره'}
      />
    </CommonWebBox>
  );
}

export default Create;
