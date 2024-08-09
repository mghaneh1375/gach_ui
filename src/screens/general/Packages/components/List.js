import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import BestComments from '../../../../components/web/Comment/BestComments';
import {getDevice} from '../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import commonTranslator from '../../../../translator/Common';
import {Translator} from '../Translator';
import Card from './Card';
import {dispatchPackagesContext, packagesContext} from './Context';
import Filter from './Filter';
import {fetchAllPackages} from './Utility';

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
  const [teachers, setTeachers] = useState();
  const [showFilter, setShowFilter] = useState(true);
  const [clearFilter, setClearFilter] = useState(false);
  const [bestComments, setBestComments] = useState();
  const [viewableItems, setViewableItems] = useState();

  React.useEffect(() => {
    if (state.selectableItems === undefined) return;
    setViewableItems(state.selectableItems.slice(0, 9));
  }, [state.selectableItems]);

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
      generalRequest(
        routes.getTopComments + 'content',
        'get',
        undefined,
        'data',
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null || res[1] == null) {
        props.navigate('/');
        return;
      }

      setMin(res[0].min);
      setMax(res[0].max);
      setBestComments(res[1]);

      setMinDuration(res[0].minDuration);
      setMaxDuration(res[0].maxDuration);

      if (res[0].tags !== undefined) {
        let tmp = res[0].tags.map(elem => {
          return {id: elem, item: elem};
        });
        tmp.push({id: 'all', item: 'همه'});
        setTags(tmp);
      }

      if (res[0].teachers !== undefined) {
        let tmp = res[0].teachers.map(elem => {
          return {id: elem, item: elem};
        });
        tmp.push({id: 'all', item: 'همه'});
        setTeachers(tmp);
      }

      if (props.isInMyMode) {
        dispatch({
          allItems: res[0],
          selectableItems: res[0],
        });
      } else
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
  useEffect(() => {
    if (isInPhone) setShowFilter(false);
  }, [isInPhone]);
  return (
    <MyView
      style={{
        alignSelf: 'center',
        width: props.token === undefined && !isInPhone ? '80%' : '100%',
        marginBottom: 100,
      }}>
      {!props.isInMyMode && (
        <CommonWebBox
          style={
            showFilter && isInPhone
              ? {position: 'fixed', zIndex: '1', margin: '0px'}
              : {}
          }>
          {!isInPhone && (
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
                  onPress={() => {
                    setShowFilter(!showFilter);
                  }}
                  title={commonTranslator.showFilters}
                />
              </PhoneView>
            </EqualTwoTextInputs>
          )}
          {isInPhone && (
            <MyView style={{...styles.alignSelfCenter, ...styles.gap10}}>
              <PhoneView style={{...styles.gap10}}>
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

              <CommonButton
                iconDir={'left'}
                textStyle={{...styles.fontSize17, ...styles.bold}}
                icon={faChevronRight}
                onPress={() => setShowFilter(!showFilter)}
                title={commonTranslator.showFilters}
              />
              <SimpleText
                style={{
                  ...styles.alignSelfCenter,
                  ...styles.cursor_pointer,
                  ...styles.colorOrangeRed,
                }}
                onPress={() => {
                  setClearFilter(true);
                  dispatch({selectableItems: state.allItems});
                }}
                text={commonTranslator.clearFilters}
              />
            </MyView>
          )}
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
                teachers={teachers}
                token={props.token}
                setClearFilter={setClearFilter}
                clearFilter={clearFilter}
                show={showFilter}
                close={() => setShowFilter(false)}
              />
            )}
        </CommonWebBox>
      )}
      <BestComments bestComments={bestComments} />
      <MyView>
        <SimpleText
          style={{
            ...styles.BlueBold,
            ...styles.fontSize25,
            ...styles.textCenter,
            ...styles.marginTop20,
            ...styles.marginBottom20,
          }}
          text={' دوره‌های آموزشی'}
        />
      </MyView>
      <PhoneView style={{...styles.gap10, justifyContent: 'space-around'}}>
        {viewableItems !== undefined &&
          viewableItems.map((elem, index) => {
            return (
              <Card
                isInMyMode={props.isInMyMode}
                isInPhone={isInPhone}
                package={elem}
                key={index}
                navigate={props.navigate}
              />
            );
          })}
      </PhoneView>
      {viewableItems !== undefined &&
        viewableItems.length < state.selectableItems.length && (
          <SimpleText
            text={'نمایش بیشتر'}
            style={{
              ...styles.alignSelfCenter,
              ...styles.cursor_pointer,
              ...styles.BlueBold,
              ...styles.fontSize20,
              ...styles.margin25,
            }}
            onPress={() => {
              setViewableItems(
                state.selectableItems.slice(
                  0,
                  Math.min(
                    viewableItems.length + 6,
                    state.selectableItems.length,
                  ),
                ),
              );
            }}
          />
        )}
    </MyView>
  );
}

export default List;
