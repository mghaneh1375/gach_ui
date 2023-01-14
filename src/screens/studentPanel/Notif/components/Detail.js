import React, {useState} from 'react';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {tagsStyles} from '../../../../services/Utility';
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
      if (res[0] === null) {
        props.setLoading(false);
        props.navigate('/');
        return;
      }

      if (!res[0].oldSeen) {
        Promise.all([
          generalRequest(
            routes.getMyAlerts,
            'get',
            undefined,
            'data',
            props.token,
          ),
        ]).then(res2 => {
          setNotif(res[0]);
          props.setLoading(false);
          if (res2[0] != null) props.updateAlerts(res2[0]);
          else props.updateAlerts([]);
        });
      } else {
        props.setLoading(false);
        setNotif(res[0]);
      }
    });
  }, [props]);

  useEffectOnce(() => {
    fetchNotif();
  }, [fetchNotif]);

  const systemFonts = [...defaultSystemFonts, 'IRANSans'];

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
          source={{html: notif.desc}}
          tagsStyles={tagsStyles}
          systemFonts={systemFonts}
        />
      )}
    </CommonWebBox>
  );
}

export default Detail;
