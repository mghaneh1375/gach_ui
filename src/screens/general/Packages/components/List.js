import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {dispatchPackagesContext, packagesContext} from './Context';
import {fetchAllPackages} from './Utility';
import React, {useState} from 'react';
import {getDevice} from '../../../../services/Utility';
import {styles} from '../../../../styles/Common/Styles';
import Card from './Card';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {Translator} from '../Translator';
import commonTranslator from '../../../../translator/Common';
import Filter from './Filter';

function List(props) {
  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [minDuration, setMinDuration] = useState();
  const [maxDuration, setMaxDuration] = useState();
  const [tags, setTags] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);

  React.useEffect(() => {
    if (isWorking || state.allItems !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      fetchAllPackages(
        props.isInMyMode,
        props.token === null || props.token === undefined || props.token === ''
          ? undefined
          : props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      setMin(res[0].min);
      setMax(res[0].max);

      setMinDuration(res[0].minDuration);
      setMaxDuration(res[0].maxDuration);

      if (res[0].tags !== undefined) {
        let tmp = res[0].tags.map(elem => {
          return {id: elem, item: elem};
        });
        tmp.push({id: 'all', item: 'همه'});
        setTags(tmp);
      }

      dispatch({
        allItems: res[0].data,
        selectableItems: res[0].data,
      });

      setIsWorking(false);
    });
  }, [dispatch, props, isWorking, state.allItems]);

  const changeMode = React.useCallback(() => {
    props.setMode('detail');
  }, [props]);

  React.useEffect(() => {
    if (state.selectedPackage === undefined) return;
    changeMode();
  }, [state.selectedPackage, changeMode]);

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  return (
    <MyView
      style={{
        alignSelf: 'center',
        width: props.token === undefined && !isInPhone ? '80%' : '100%',
      }}>
      {!props.isInMyMode && (
        <CommonWebBox>
          <EqualTwoTextInputs>
            <PhoneView style={{...styles.alignSelfCenter, ...styles.gap10}}>
              <SimpleText style={styles.BlueBold} text={Translator.buy} />
              {state.allItems !== undefined && (
                <SimpleText
                  style={{...styles.fontSize13, ...styles.dark_blue_color}}
                  text={
                    'نمایش ' +
                    state.selectableItems.length +
                    ' مورد از ' +
                    state.allItems.length +
                    ' مورد '
                  }
                />
              )}
            </PhoneView>
            <PhoneView style={{...styles.alignSelfCenter, ...styles.gap10}}>
              <SimpleText
                style={{
                  ...styles.alignSelfCenter,
                  ...styles.gap10,
                  ...styles.cursor_pointer,
                  ...styles.colorOrangeRed,
                }}
                onPress={() => setClearFilter(true)}
                text={commonTranslator.clearFilters}
              />
              <CommonButton
                iconDir={'left'}
                textStyle={{...styles.fontSize17, ...styles.bold}}
                icon={faChevronRight}
                onPress={() => setShowFilter(!showFilter)}
                title={commonTranslator.showFilters}
              />
            </PhoneView>
          </EqualTwoTextInputs>

          {showFilter &&
            min !== undefined &&
            max !== undefined &&
            maxDuration !== undefined &&
            minDuration !== undefined && (
              <Filter
                min={min}
                max={max}
                minDuration={minDuration}
                maxDuration={maxDuration}
                tags={tags}
                token={props.token}
                setClearFilter={setClearFilter}
                clearFilter={clearFilter}
              />
            )}
        </CommonWebBox>
      )}

      <PhoneView style={styles.gap10}>
        {state.selectableItems !== undefined &&
          state.selectableItems.map((elem, index) => {
            return (
              <Card
                isInMyMode={props.isInMyMode}
                isInPhone={isInPhone}
                package={elem}
                key={index}
              />
            );
          })}
      </PhoneView>
    </MyView>
  );
}

export default List;
