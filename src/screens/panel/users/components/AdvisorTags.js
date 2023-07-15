import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {dispatchUsersContext, usersContext} from './Context';
import {
  removeItems,
  showError,
  showSuccess,
} from '../../../../services/Utility';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../styles/Common/Styles';

function AdvisorTags(props) {
  const [isWorking, setIsWorking] = useState(false);

  const useGlobalState = () => [
    React.useContext(usersContext),
    React.useContext(dispatchUsersContext),
  ];

  const [state, dispatch] = useGlobalState();

  const fetchData = React.useCallback(() => {
    if (state.selectedUser.tags !== undefined || isWorking) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getAdvisorTags + state.selectedUser.id,
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

      state.selectedUser.tags = res[0];

      dispatch({selectedUser: state.selectedUser});
    });
  }, [state.selectedUser, props, dispatch, isWorking]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData, state.selectedUser]);

  const [newTag, setNewTag] = useState();

  const addNewTag = async () => {
    if (newTag === undefined || newTag.length === 0) {
      showError('لطفا تگ موردنظر خود را وارد نمایید');
      return;
    }

    props.setLoading(true);

    let res = await generalRequest(
      routes.addAdvisorTag + state.selectedUser.id,
      'put',
      {
        tag: newTag,
      },
      undefined,
      props.token,
    );

    props.setLoading(false);

    if (res != null) {
      state.selectedUser.tags.push(newTag);
      dispatch({selectedUser: state.selectedUser});
      setNewTag('');
      showSuccess();
    }
  };

  const removeTag = async tag => {
    props.setLoading(true);

    let res = await generalRequest(
      routes.removeAdvisorTag + state.selectedUser.id,
      'delete',
      {
        tag: tag,
      },
      undefined,
      props.token,
    );

    props.setLoading(false);

    if (res != null) {
      state.selectedUser.tags = state.selectedUser.tags.filter(e => {
        return e != tag;
      });

      dispatch({selectedUser: state.selectedUser});
      showSuccess();
    }
  };

  return (
    <CommonWebBox
      header={'مدیریت تگ های ' + state.selectedUser.name}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {state.selectedUser.tags !== undefined && (
        <>
          {state.selectedUser.tags.map((e, index) => {
            return (
              <PhoneView key={index} style={{...styles.gap15}}>
                <SimpleText text={e} />
                <SimpleFontIcon
                  onPress={() => removeTag(e)}
                  icon={faTrash}
                  kind={'normal'}
                />
              </PhoneView>
            );
          })}
          <PhoneView style={{...styles.gap15}}>
            <JustBottomBorderTextInput
              placeholder={'تگ جدید'}
              subText={'تگ جدید'}
              value={newTag}
              onChangeText={e => setNewTag(e)}
            />
            <CommonButton
              theme={'dark'}
              title={'افزودن'}
              onPress={() => addNewTag()}
            />
          </PhoneView>
        </>
      )}
    </CommonWebBox>
  );
}

export default AdvisorTags;
