import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {showError, showSuccess} from '@/services/utility';
import {CommonButton, FontIcon, PhoneView, SimpleText} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput';
import {styles} from '@/styles/common/styles';
import {faCheck, faClose} from '@fortawesome/free-solid-svg-icons';
import {useCallback, useEffect, useState} from 'react';
import commonTranslator from '@/translator/common';

function Report({showReportPane, onClose, token, setLoading, studentId}) {
  const [reportTags, setReportTags] = useState();
  const [showReportDesc, setShowReportDesc] = useState(false);
  const [reportDesc, setReportDesc] = useState();

  const fetchReportTags = useCallback(() => {
    setLoading(true);
    Promise.all([
      generalRequest(
        routes.getAdviceAllReportTags,
        'get',
        undefined,
        'data',
        token,
      ),
    ]).then(res => {
      setLoading(false);
      if (res[0] !== null) {
        setReportTags([
          ...res[0].map(e => ({...e, selected: false})),
          {id: -1, label: 'سایر', selected: false},
        ]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (showReportPane && !reportTags) fetchReportTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showReportPane]);

  return (
    <>
      {showReportPane && (
        <>
          <SimpleText
            style={styles.BlueBold}
            text={'چه مشکلی رو میخوای گزارش کنی؟'}
          />
          {reportTags && (
            <PhoneView>
              {reportTags.map((e, index) => {
                return (
                  <CommonButton
                    theme={e.selected ? 'dark' : 'transparent'}
                    key={index}
                    title={e.label}
                    onPress={() => {
                      if (e.id === -1 && !e.selected) {
                        setShowReportDesc(true);
                        setReportTags(
                          reportTags.map(ee => {
                            return {...ee, selected: ee.id === -1};
                          }),
                        );
                      } else {
                        setShowReportDesc(false);
                        setReportDesc(undefined);
                        setReportTags(
                          reportTags.map(ee => {
                            if (ee.id === e.id)
                              return {...ee, selected: !ee.selected};
                            if (ee.id === -1) return {...ee, selected: false};
                            return ee;
                          }),
                        );
                      }
                    }}
                  />
                );
              })}
            </PhoneView>
          )}
          {showReportDesc && (
            <JustBottomBorderTextInput
              multiline={true}
              value={reportDesc}
              style={{maxWidth: 'unset'}}
              onChangeText={e => setReportDesc(e)}
              placeholder={commonTranslator.desc}
              subText={commonTranslator.optional}
            />
          )}
          <PhoneView
            style={{
              justifyContent: 'end',
              gap: '10px',
            }}>
            <FontIcon
              theme="rect"
              kind={'normal'}
              icon={faClose}
              back={'orange'}
              onPress={() => {
                setReportTags(reportTags.map(e => ({...e, selected: false})));
                setReportDesc(undefined);
                onClose();
              }}
            />
            <FontIcon
              theme="rect"
              kind={'normal'}
              icon={faCheck}
              back={'green'}
              onPress={async () => {
                if (
                  reportTags.filter(e => e.id !== -1 && e.selected).length ===
                    0 &&
                  (!reportDesc || reportDesc.length === 0)
                ) {
                  showError('لطفا گزارش را وارد نمایید');
                  return;
                }
                const data = {};
                if (
                  reportTags.filter(e => e.id !== -1 && e.selected).length > 0
                )
                  data.tagIds = reportTags
                    .filter(e => e.id !== -1 && e.selected)
                    .map(e => e.id);

                if (reportDesc && reportDesc.length > 0) data.desc = reportDesc;

                setLoading(true);
                const res = await generalRequest(
                  routes.setAdviceScheduleReportProblemsByAdvisor + studentId,
                  'put',
                  data,
                  undefined,
                  token,
                );
                setLoading(false);
                if (res && res !== null) {
                  showSuccess();
                  setReportTags(reportTags.map(e => ({...e, selected: false})));
                  setReportDesc(undefined);
                  onClose();
                }
              }}
            />
          </PhoneView>
        </>
      )}
    </>
  );
}

export default Report;
