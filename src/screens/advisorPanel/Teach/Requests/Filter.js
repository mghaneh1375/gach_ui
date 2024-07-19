import {useMemo, useState} from 'react';
import {CommonButton, MyView, PhoneView} from '../../../../styles/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../translator/Common';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import Translator from '../Schedule/components/Translator';

function Filter(props) {
  const [statusValues, expireValues, teachModes] = useMemo(() => {
    return [
      [
        {item: Translator.pending, id: 'pending'},
        {item: Translator.accept, id: 'accept'},
        {item: Translator.reject, id: 'reject'},
        {item: Translator.answered, id: 'answered'},
        {item: Translator.paid, id: 'paid'},
        {item: Translator.cancel, id: 'cancel'},
        {item: commonTranslator.all, id: 'all'},
      ],
      [
        {item: 'شروع نشده', id: 'active'},
        {item: 'برگزار شده', id: 'expired'},
        {item: commonTranslator.all, id: 'all'},
      ],
      [
        {item: Translator.private, id: 'private'},
        {item: Translator.semiPrivate, id: 'semi_private'},
        {item: commonTranslator.all, id: 'all'},
      ],
    ];
  }, []);

  const [statusMode, setStatusMode] = useState(props.initFilter.statusMode);
  const [expireMode, setExpireMode] = useState(props.initFilter.expireMode);
  const [teachMode, setTeachMode] = useState(props.initFilter.teachMode);

  return (
    <MyView>
      <PhoneView style={{gap: '10px'}}>
        <JustBottomBorderSelect
          values={statusValues}
          setter={setStatusMode}
          value={
            statusMode === undefined
              ? undefined
              : statusValues.find(elem => elem.id === statusMode)
          }
          placeholder={Translator.status}
          subText={Translator.status}
        />
        <JustBottomBorderSelect
          values={expireValues}
          setter={setExpireMode}
          value={
            expireMode === undefined
              ? undefined
              : expireValues.find(elem => elem.id === expireMode)
          }
          placeholder={Translator.activeMode}
          subText={Translator.activeMode}
        />
        <JustBottomBorderSelect
          values={teachModes}
          setter={setTeachMode}
          value={
            teachMode === undefined
              ? undefined
              : teachModes.find(elem => elem.id === teachMode)
          }
          placeholder={Translator.teachMode}
          subText={Translator.teachMode}
        />
      </PhoneView>
      <CommonButton
        onPress={async () => {
          props.setLoading(true);
          const params = new URLSearchParams();
          if (statusMode !== undefined && statusMode !== 'all')
            params.append('statusMode', statusMode);
          if (expireMode !== undefined && expireMode !== 'all')
            params.append('expireMode', expireMode);
          if (teachMode !== undefined && teachMode !== 'all')
            params.append('teachMode', teachMode);
          const res = await generalRequest(
            routes.getTeachRequests + '?' + params.toString(),
            'get',
            undefined,
            'data',
            props.token,
          );
          props.setLoading(false);
          props.setData(res);
          const tmp = [];
          res.forEach(element => {
            element.requests.forEach(itr => {
              tmp.push({
                id: element.id,
                start: element.start,
                teachMode: element.teachMode,
                requestCounts: element.requestCounts,
                minCap: element.minCap,
                maxCap: element.maxCap,
                title: element.title,
                request: itr,
              });
            });
          });
          props.setRequests(tmp);
        }}
        title={commonTranslator.filter}
      />
    </MyView>
  );
}

export default Filter;
