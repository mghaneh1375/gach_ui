import {faEye} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {CommonWebBox, EqualTwoTextInputs, SimpleText} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import {SimpleFontIcon} from '@/styles/common/FontIcon.jsx';
import Translator from '../translate';
import {dispatchPublicNotifContext, publicNotifContext} from './Context.jsx';
import commonTranslator from '@/translator/common';
import {styles} from '@/styles/common/styles';
import RenderHTML from 'react-native-render-html';
import AttachBox from '../../../panel/ticket/components/show/attachBox/AttachBox.jsx';
import {systemFonts, tagsStyles} from '@/services/utility';
function List(props) {
  const useGlobalState = () => [
    React.useContext(publicNotifContext),
    React.useContext(dispatchPublicNotifContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [selectedNotif, setSelectedNotif] = useState();
  const [data, setData] = useState();
  React.useEffect(() => {
    setData(state.notifs);
  }, [state.notifs]);
  const fetchMyNotifs = React.useCallback(() => {
    if (state.notifs !== undefined) return;
    props.setLoading(true);
    Promise.all([
      generalRequest(routes.myNotifs, 'get', undefined, 'data', props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      dispatch({
        notifs: res[0],
      });
    });
  }, [props, state.notifs, dispatch]);
  useEffectOnce(() => {
    fetchMyNotifs();
  }, [fetchMyNotifs]);
  const columns = [
    {
      name: '',
      cell: index => {
        return (
          <SimpleFontIcon
            onPress={() => {
              setSelectedNotif(state.notifs[index]);
              if (!state.notifs[index].status) {
                const tmp = state.notifs;
                tmp.map(elem => {
                  if (state.notifs[index].id === elem.id) {
                    elem.seen = true;
                  }
                  return elem;
                });
                dispatch({
                  notifs: tmp,
                });
                generalRequest(
                  routes.setSeenNotif + state.notifs[index].id,
                  'put',
                  undefined,
                  undefined,
                  props.token,
                );
              }
            }}
            icon={faEye}
          />
        );
      },
      minWidth: '40px',
      maxWidth: '40px',
      center: true,
    },
    {
      name: Translator.title,
      selector: row => row.title,
      grow: 3,
      center: true,
    },
    {
      name: commonTranslator.createdAt,
      selector: row => row.createdAt,
      grow: 2,
      center: true,
    },
    {
      name: Translator.seenStatus,
      selector: row => (row.seen ? Translator.seen : Translator.unseen),
      grow: 1,
      center: true,
    },
  ];
  return (
    <>
      {selectedNotif && (
        <CommonWebBox
          header={Translator.myNotifs}
          backBtn={true}
          onBackClick={() => setSelectedNotif(undefined)}>
          <EqualTwoTextInputs>
            <SimpleText
              style={{
                ...styles.BlueBold,
              }}
              text={selectedNotif.title}
            />
            <SimpleText
              style={{
                ...styles.BlueBold,
              }}
              text={selectedNotif.createdAt}
            />
          </EqualTwoTextInputs>

          <RenderHTML
            source={{
              html: selectedNotif.desc,
            }}
            tagsStyles={tagsStyles}
            systemFonts={systemFonts}
          />

          {selectedNotif !== undefined && selectedNotif.attach !== undefined && (
            <AttachBox
              onClick={() => {
                window.open(selectedNotif.attach);
              }}
              filename={selectedNotif.attach}
            />
          )}
        </CommonWebBox>
      )}
      {!selectedNotif && (
        <CommonWebBox header={Translator.myNotifs}>
          {data && (
            <CommonDataTable
              paginate={false}
              columns={columns}
              data={data}
              show_row_no={false}
              pagination={false}
              groupOps={[]}
              excel={false}
            />
          )}
        </CommonWebBox>
      )}
    </>
  );
}
export default List;
