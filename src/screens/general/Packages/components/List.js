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
  const [tags, setTags] = useState();

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
      setTags(
        res[0].tags.map(elem => {
          return {id: elem, item: elem};
        }),
      );

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
                text={commonTranslator.clearFilters}
              />
              <CommonButton
                iconDir={'left'}
                textStyle={{...styles.fontSize17, ...styles.bold}}
                icon={faChevronRight}
                title={commonTranslator.showFilters}
              />
            </PhoneView>
          </EqualTwoTextInputs>

          {min !== undefined && <Filter min={min} max={max} tags={tags} />}
        </CommonWebBox>
      )}

      <PhoneView style={styles.gap10}>
        {state.allItems !== undefined &&
          state.allItems.map((elem, index) => {
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
