import {useCallback} from 'react';
import {
  CommonButton,
  CommonRadioButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../styles/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {useEffectOnce} from 'usehooks-ts';
import {generalRequest, videoGeneralRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {useState} from 'react';
import React from 'react';
import {showSuccess} from '../../../../services/Utility';

function CopySessions(props) {
  const navigate = props.navigate;
  const [contents, setContents] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [selectedSrcContent, setSelectedSrcContent] = useState();
  const [selectedDestContent, setSelectedDestContent] = useState();
  const [selectedSessions, setSelectedSessions] = useState([]);

  const fetchContentsSessions = useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getAllCotents,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setContents(
        res[0].map(e => {
          return {
            id: e.id,
            item: e.name,
            sessions: e.sessions,
          };
        }),
      );
    });
  }, [state.token, navigate, dispatch]);

  useEffectOnce(() => {
    fetchContentsSessions();
  });

  return (
    <CommonWebBox title={'کپی کردن جلسات'}>
      {contents !== undefined && (
        <PhoneView>
          <MyView
            style={{
              width: '48%',
              borderLeft: '2px dotted black',
              minHeight: '50vh',
              gap: '5px',
            }}>
            <JustBottomBorderSelect
              isHalf={true}
              values={contents}
              value={contents.find(e => e.id === selectedSrcContent)}
              setter={setSelectedSrcContent}
              placeholder={'دوره مبدا'}
            />
            {selectedSrcContent !== undefined &&
              contents
                .find(e => e.id === selectedSrcContent)
                .sessions.map((session, index) => {
                  return (
                    <CommonRadioButton
                      key={index}
                      onPress={() => {
                        if (selectedSessions.indexOf(session.id) !== -1)
                          setSelectedSessions(
                            selectedSessions.filter(e => e.id !== session.id),
                          );
                        else
                          setSelectedSessions([
                            ...selectedSessions,
                            session.id,
                          ]);
                      }}
                      status={
                        selectedSessions.indexOf(session.id) !== -1
                          ? 'checked'
                          : 'unchecked'
                      }
                      textStyle={{alignSelf: 'center', fontSize: 12}}
                      style={{height: 35}}
                      text={session.name}
                      isCheckBox={true}
                    />
                  );
                })}
          </MyView>
          <MyView style={{width: '48%'}}>
            {selectedSrcContent !== undefined && (
              <>
                <JustBottomBorderSelect
                  isHalf={true}
                  values={contents.filter(e => e.id !== selectedSrcContent)}
                  value={contents.find(e => e.id === selectedDestContent)}
                  setter={setSelectedDestContent}
                  placeholder={'دوره مقصد'}
                />
              </>
            )}
          </MyView>
        </PhoneView>
      )}
      {selectedSrcContent !== undefined && selectedDestContent !== undefined && (
        <CommonButton
          onPress={async () => {
            dispatch({loading: true});
            let res = await videoGeneralRequest(
              routes.copySessions,
              'post',
              {
                srcId: selectedSrcContent,
                sessions: selectedSessions,
                destId: selectedDestContent,
              },
              undefined,
              state.token,
            );
            dispatch({loading: false});
            if (res !== null) {
              showSuccess();
            }
          }}
          theme={'dark'}
          title={'انجام جابه جایی'}
        />
      )}
    </CommonWebBox>
  );
}

export default CopySessions;
