import React, {useState} from 'react';
import {
  faClock,
  faLock,
  faPaperclip,
  faPlayCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  convertSecToMinWithOutHour,
  getDevice,
  showError,
} from '../../../../../services/Utility';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {styles} from '../../../../../styles/Common/Styles';
import Video from '../../../../panel/Video';
import {Pressable} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {useEffectOnce} from 'usehooks-ts';
import {dispatchStateContext, globalStateContext} from '../../../../../App';
import {useParams} from 'react-router';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';

function SessionDetail(props) {
  const isInPhone = getDevice().indexOf('WebPort') !== -1;
  const [showAdvertising, setShowAdvertising] = useState(true);
  const [selectedSession, setSelectedSession] = useState();
  const [allSessions, setAllSessions] = useState();
  const [adv, setAdv] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const params = useParams();

  const fetchSessions = React.useCallback(() => {
    dispatch({loading: true});

    Promise.all([
      generalRequest(
        routes.fetchSessions + params.slug + '/' + params.sessionId,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        props.navigate('/packages');
        return;
      }

      setAllSessions(res[0].sessions);
      setAdv(res[0].adv);
      setSelectedSession(res[0].sessions.find(elem => elem.selected));
    });
  }, [dispatch, state.token, params, props]);

  useEffectOnce(() => {
    if (params.sessionId === undefined || params.slug === undefined) {
      props.navigate('/packages');
      return;
    }
    fetchSessions();
  }, [fetchSessions, props.navigate]);

  return (
    <MyView>
      {selectedSession !== undefined && (
        <CommonWebBox
          backBtn={true}
          onBackClick={() => props.navigate('/packages/' + params.slug)}
          btn={
            <PhoneView style={styles.gap15}>
              {selectedSession.attachesCount !== undefined &&
                selectedSession.attachesCount > 0 && (
                  <PhoneView style={{...styles.gap5, ...styles.marginLeft15}}>
                    <SimpleFontIcon kind={'med'} icon={faPaperclip} />
                    <SimpleText
                      style={styles.alignSelfCenter}
                      text={selectedSession.attachesCount}
                    />
                  </PhoneView>
                )}
              <SimpleFontIcon kind={'med'} icon={faClock} />
              <SimpleText
                style={styles.alignSelfCenter}
                text={
                  convertSecToMinWithOutHour(selectedSession.duration) + '"'
                }
              />
            </PhoneView>
          }
          header={selectedSession.title}></CommonWebBox>
      )}

      <PhoneView>
        {selectedSession !== undefined && (
          <CommonWebBox width={isInPhone ? '100%' : '70%'}>
            {showAdvertising && adv !== undefined && (
              <Video
                onFinish={() => setShowAdvertising(false)}
                disableSeekbar={true}
                src={adv}
              />
            )}
            {!showAdvertising && (
              <Video disableSeekbar={false} src={selectedSession.video} />
            )}
            <RenderHTML
              source={{
                html: selectedSession.description,
              }}
            />
          </CommonWebBox>
        )}

        {!isInPhone && allSessions !== undefined && (
          <CommonWebBox width={'30%'}>
            {allSessions.map((elem, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    if (
                      elem.video === null ||
                      elem.video === undefined ||
                      elem.video === 'null' ||
                      elem.video === ''
                    )
                      showError(
                        'برای مشاهده این جلسه باید این بسته را خریداری نمایید',
                      );
                    else {
                      setSelectedSession(elem);
                    }
                  }}
                  style={{...styles.borderBottom1, ...styles.gap10}}>
                  <EqualTwoTextInputs>
                    <PhoneView style={{...styles.gap10}}>
                      <SimpleFontIcon kind={'med'} icon={faPlayCircle} />
                      <SimpleText text={elem.title} />
                    </PhoneView>

                    <PhoneView style={{...styles.gap10}}>
                      {(elem.video === null ||
                        elem.video === undefined ||
                        elem.video === 'null' ||
                        elem.video === '') && (
                        <SimpleFontIcon kind={'med'} icon={faLock} />
                      )}
                      {elem.attachesCount !== undefined &&
                        elem.attachesCount > 0 && (
                          <PhoneView
                            style={{...styles.gap5, ...styles.marginLeft15}}>
                            <SimpleFontIcon kind={'med'} icon={faPaperclip} />
                            <SimpleText
                              style={styles.alignSelfCenter}
                              text={elem.attachesCount}
                            />
                          </PhoneView>
                        )}
                      <SimpleText
                        style={styles.alignSelfCenter}
                        text={convertSecToMinWithOutHour(elem.duration) + '"'}
                      />
                    </PhoneView>
                  </EqualTwoTextInputs>
                </Pressable>
              );
            })}
          </CommonWebBox>
        )}
      </PhoneView>
    </MyView>
  );
}

export default SessionDetail;
