import React, {useState} from 'react';
import RenderHTML from 'react-native-render-html';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  SimpleText,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';

function Detail(props) {
  const [notif, setNotif] = useState();

  const fetchNotif = React.useCallback(() => {
    if (props.id === undefined) return;
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.fetchNotif + props.id,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setNotif(res[0]);
    });
  }, [props]);

  useEffectOnce(() => {
    fetchNotif();
  }, [fetchNotif]);

  return (
    <CommonWebBox
      header={'پیام های من'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {notif !== undefined && (
        <EqualTwoTextInputs>
          <SimpleText style={{...styles.BlueBold}} text={notif.title} />
          <SimpleText style={{...styles.BlueBold}} text={notif.createdAt} />
        </EqualTwoTextInputs>
      )}

      {notif !== undefined && (
        <RenderHTML
          source={{
            html: notif.desc,
          }}
        />
      )}
    </CommonWebBox>
  );
}

export default Detail;
