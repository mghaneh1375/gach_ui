import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {CommonButton, PhoneView} from '@/styles';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect';
import {useCallback, useEffect, useState} from 'react';
import {showSuccess, trueFalseValues} from '@/services/utility';
import commonTranslator from '@/translator/common';
import {Loader} from '@/styles/common/Loader';
import {Translate} from './translate';

function Config({token, onClose}) {
  const [config, setConfig] = useState();
  const [loading, setLoading] = useState(false);

  const fetchConfig = useCallback(() => {
    Promise.all([
      generalRequest(
        routes.getStudentDashboardConfig,
        'get',
        undefined,
        'data',
        token,
      ),
    ]).then(res => {
      if (res[0]) setConfig(res[0]);
    });
  }, [token]);

  useEffect(() => {
    fetchConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <PhoneView style={{gap: '20px', rowGap: '10px'}}>
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_current_karbargs: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_current_karbargs,
          )}
          subText={Translate.showCurrentKarbargs}
          placeholder={Translate.showCurrentKarbargs}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_requests_status_for_advice: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_requests_status_for_advice,
          )}
          subText={Translate.showRequestsStatusForAdvice}
          placeholder={Translate.showRequestsStatusForAdvice}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_requests_status_for_teach: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_requests_status_for_teach,
          )}
          subText={Translate.showRequestsStatusForTeach}
          placeholder={Translate.showRequestsStatusForTeach}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_suggestion_for_content: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_suggestion_for_content,
          )}
          subText={Translate.showSuggestionForContent}
          placeholder={Translate.showSuggestionForContent}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_suggestion_for_quiz: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_suggestion_for_quiz,
          )}
          subText={Translate.showSuggestionForQuiz}
          placeholder={Translate.showSuggestionForQuiz}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_future_quiz: newValue,
            }))
          }
          value={trueFalseValues.find(e => e.id === config?.show_future_quiz)}
          subText={Translate.showFutureQuiz}
          placeholder={Translate.showFutureQuiz}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_last_tickets: newValue,
            }))
          }
          value={trueFalseValues.find(e => e.id === config?.show_last_tickets)}
          subText={Translate.showLastTickets}
          placeholder={Translate.showLastTickets}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_last_notifs: newValue,
            }))
          }
          value={trueFalseValues.find(e => e.id === config?.show_last_notifs)}
          subText={Translate.showLastNotifs}
          placeholder={Translate.showLastNotifs}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_dashboard: newValue,
            }))
          }
          value={trueFalseValues.find(e => e.id === config?.show_dashboard)}
          subText={Translate.showDashboard}
          placeholder={Translate.showDashboard}
        />
      </PhoneView>
      {!loading && (
        <PhoneView>
          <CommonButton
            onPress={async () => {
              config.id = undefined;
              config.user_id = undefined;
              setLoading(true);
              const res = await generalRequest(
                routes.setStudentDashboardConfig,
                'put',
                config,
                undefined,
                token,
              );
              setLoading(false);
              if (res !== null) {
                showSuccess();
                onClose();
              }
            }}
            theme={'dark'}
            title={commonTranslator.confirm}
          />
          <CommonButton
            onPress={onClose}
            theme={'yellow'}
            title={commonTranslator.cancel}
          />
        </PhoneView>
      )}
      {loading && <Loader />}
    </>
  );
}

export default Config;
