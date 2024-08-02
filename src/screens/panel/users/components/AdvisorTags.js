import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import {dispatchUsersContext, usersContext} from './Context';
import {showError, showSuccess} from '../../../../services/Utility';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../translator/Common';

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
        routes.getAdvisorTags +
          state.selectedUser.id +
          '?mode=' +
          props.teachMode,
        'get',
        undefined,
        'data',
        props.token,
      ),
      generalRequest(routes.getDistinctAdvisorsTags, 'get', undefined, 'data'),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null || res[1] == null) {
        props.setMode('list');
        return;
      }

      state.selectedUser.tags = res[0];
      let allTags = res[1].map(e => {
        return {name: e, id: e};
      });

      setNewTag(res[0]);
      dispatch({selectedUser: state.selectedUser, allTags: allTags});

      setIsWorking(false);
    });
  }, [state.selectedUser, props, dispatch, isWorking]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData, state.selectedUser]);

  const [newTag, setNewTag] = useState();

  const setNewTags = async () => {
    if (newTag === undefined || newTag.length === 0) {
      showError('لطفا تگ موردنظر خود را وارد نمایید');
      return;
    }

    props.setLoading(true);

    let res = await generalRequest(
      routes.addAdvisorTag + state.selectedUser.id + '?mode=' + props.teachMode,
      'put',
      {
        tags: newTag,
      },
      undefined,
      props.token,
    );

    props.setLoading(false);

    if (res != null) {
      state.selectedUser.tags = undefined;
      dispatch({selectedUser: state.selectedUser, needUpdate: true});
      showSuccess();
    }
  };

  const setSelectedTags = item => {
    if (item === undefined) return;
    setNewTag(
      item.map(elem => {
        return elem.name;
      }),
    );
    if (item.length > 0) {
      let tmp = state.allTags;
      item.forEach(itr => {
        if (state.allTags.find(elem => elem.id === itr.id) === undefined) {
          tmp.push(itr);
        }
      });
      dispatch({allTags: tmp});
    }
  };

  return (
    <CommonWebBox
      header={'مدیریت تگ‌های ' + state.selectedUser.name}
      backBtn={true}
      onBackClick={() => {
        state.selectedUser.tags = undefined;
        dispatch({selectedUser: state.selectedUser, needUpdate: true});
        props.setMode('list');
      }}>
      {state.selectedUser.tags !== undefined && (
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={'تگ\u200cها'}
            subText={'تگ\u200cها'}
            resultPane={true}
            multi={true}
            setSelectedItem={setSelectedTags}
            reset={false}
            values={state.allTags}
            addNotFound={true}
            value={
              newTag === undefined
                ? []
                : newTag.map((elem, index) => {
                    return {id: index, name: elem};
                  })
            }
          />
        </PhoneView>
      )}

      <CommonButton
        theme={'dark'}
        title={commonTranslator.confirm}
        onPress={() => setNewTags()}
      />
    </CommonWebBox>
  );
}

export default AdvisorTags;
