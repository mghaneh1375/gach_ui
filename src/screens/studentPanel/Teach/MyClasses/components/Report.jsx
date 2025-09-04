import React, {useEffect, useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import {Translator} from '../../Translate';
import {dispatchMyTeachClassesContext, myTeachClassesContext} from './Context';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import commonTranslator from '../../../../../translator/Common';
import {showSuccess} from '../../../../../services/Utility';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';

function Report(props) {
  const useGlobalState = () => [
    React.useContext(myTeachClassesContext),
    React.useContext(dispatchMyTeachClassesContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [tags, setTags] = useState();
  const [desc, setDesc] = useState();

  const fetchReport = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getMyTeachScheduleReportProblems + state.selectedScheduleId,
        'get',
        undefined,
        'data',
        props.token,
      ),
      generalRequest(
        routes.getTeachAllReportTags,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null || res[1] === null) {
        props.setMode('list');
        return;
      }
      setTags(
        res[1].map(e => ({
          ...{isSelected: res[0].tags.indexOf(e.label) !== -1},
          ...e,
        })),
      );
      setDesc(res[0].desc);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedScheduleId]);

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedScheduleId]);

  return (
    <CommonWebBox
      header={Translator.report}
      backBtn={true}
      onBackClick={() => {
        props.setMode('list');
        dispatch({selectedScheduleId: undefined});
      }}>
      {tags && (
        <PhoneView style={{gap: '10px'}}>
          {tags.map((e, index) => {
            return (
              <CommonButton
                theme={e.isSelected ? 'dark' : 'transparent'}
                key={index}
                title={e.label}
                onPress={() =>
                  setTags(
                    tags.map(ee => {
                      if (e.id === ee.id) ee.isSelected = !ee.isSelected;
                      return ee;
                    }),
                  )
                }
              />
            );
          })}
        </PhoneView>
      )}
      <JustBottomBorderTextInput
        multiline={true}
        value={desc}
        onChangeText={e => setDesc(e)}
        placeholder={commonTranslator.desc}
        subText={commonTranslator.optional}
      />
      <CommonButton
        onPress={async () => {
          props.setLoading(true);
          const selectedTags = tags.filter(e => e.isSelected);
          const res = await generalRequest(
            routes.setMyTeachScheduleReportProblems + state.selectedScheduleId,
            'put',
            {
              tagIds:
                selectedTags.length === 0 ? [] : selectedTags.map(e => e.id),
              desc: desc === undefined || desc.length === 0 ? undefined : desc,
            },
            undefined,
            props.token,
          );
          props.setLoading(false);
          if (res !== null) {
            showSuccess();
            props.setMode('list');
          }
        }}
        title={commonTranslator.confirm}
      />
    </CommonWebBox>
  );
}

export default Report;
