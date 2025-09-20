import {CommonWebBox, PhoneView} from '@/styles';
import JustBottomBorderDatePicker from '@/styles/common/JustBottomBorderDatePicker';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect';
import commonTranslator from '@/translator/common';
import {useMemo} from 'react';
import {Translate} from './translate';

function Filter({filter, setFilter}) {
  const sectionValues = useMemo(
    () => [
      {
        item: Translate.content,
        id: 'CONTENT',
      },
      {
        item: Translate.regularQuiz,
        id: 'IRYSC_EXAM',
      },
      {
        item: Translate.openQuiz,
        id: 'OPEN_QUIZ_EXAM',
      },
      {
        item: Translate.customQuiz,
        id: 'CUSTOM_QUIZ',
      },
      {
        item: Translate.advice,
        id: 'ADVISOR',
      },
      {
        item: Translate.all,
        id: 'ALL',
      },
    ],
    [],
  );
  return (
    <>
      <CommonWebBox header={commonTranslator.filter}>
        <PhoneView
          style={{
            gap: '10px',
          }}>
          <JustBottomBorderSelect
            values={sectionValues}
            setter={newValue =>
              setFilter(prevValues => ({
                ...prevValues,
                section: newValue,
              }))
            }
            value={
              filter.section === undefined
                ? undefined
                : sectionValues.find(elem => elem.id === filter.section)
            }
            placeholder={Translate.section}
            subText={Translate.section}
          />
          <JustBottomBorderDatePicker
            value={filter?.from}
            setter={e =>
              setFilter(prevValues => ({
                ...prevValues,
                from: e,
              }))
            }
            placeholder={Translate.from}
            subText={Translate.from}
          />
          <JustBottomBorderDatePicker
            value={filter?.to}
            setter={e => {
              setFilter(prevValues => ({
                ...prevValues,
                to: e,
              }));
            }}
            placeholder={Translate.to}
            subText={Translate.to}
          />
        </PhoneView>
      </CommonWebBox>
    </>
  );
}

export default Filter;
