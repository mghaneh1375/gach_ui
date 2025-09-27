import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {CommonButton, PhoneView} from '@/styles';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect';
import {useCallback, useEffect, useState} from 'react';
import {Translate} from './translate';
import {showSuccess, trueFalseValues} from '@/services/utility';
import commonTranslator from '@/translator/common';
import {Loader} from '@/styles/common/Loader';

function Config({token, onClose}) {
  const [config, setConfig] = useState();
  const [loading, setLoading] = useState(false);

  const fetchConfig = useCallback(() => {
    Promise.all([
      generalRequest(
        routes.getAdvisorDashboardConfig,
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
              show_last_settle_request: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_last_settle_request,
          )}
          subText={Translate.showLastSettleRequest}
          placeholder={Translate.showLastSettleRequest}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_in_progress_karbargs: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_in_progress_karbargs,
          )}
          subText={Translate.showInProgressKarbargs}
          placeholder={Translate.showInProgressKarbargs}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_filled_karbargs: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_filled_karbargs,
          )}
          subText={Translate.showFilledKarbargs}
          placeholder={Translate.showFilledKarbargs}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_my_last_comments: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_my_last_comments,
          )}
          subText={Translate.showMyLastComments}
          placeholder={Translate.showMyLastComments}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_incoming_requests_for_advice: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_incoming_requests_for_advice,
          )}
          subText={Translate.showIncomingRequestsForAdvice}
          placeholder={Translate.showIncomingRequestsForAdvice}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={newValue =>
            setConfig(prevValues => ({
              ...prevValues,
              show_incoming_requests_for_teach: newValue,
            }))
          }
          value={trueFalseValues.find(
            e => e.id === config?.show_incoming_requests_for_teach,
          )}
          subText={Translate.showIncomingRequestsForTeach}
          placeholder={Translate.showIncomingRequestsForTeach}
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
                routes.setAdvisorDashboardConfig,
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
