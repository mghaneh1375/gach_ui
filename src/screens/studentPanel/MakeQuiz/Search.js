import {
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {LargePopUp} from '../../../styles/Common/PopUp';
import {styles} from '../../../styles/Common/Styles';
import Translate from './Translate';
import commonTranslator from '../../../translator/Common';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import React, {useState} from 'react';
import Card from './Card';
import {FontIcon} from '../../../styles/Common/FontIcon';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {showError, showSuccess} from '../../../services/Utility';

function Search(props) {
  const [filter, setFilter] = useState('branch');
  const [boxes, setBoxes] = useState();
  const [mode, setMode] = useState();
  const [filterId, setFilterId] = useState();
  const [selected, setSelected] = useState([]);
  const [easy, setEasy] = useState(0);
  const [mid, setMid] = useState(0);
  const [hard, setHard] = useState(0);
  const [selectingItem, setSelectingItem] = useState();
  const [lastMode, setLastMode] = useState();

  React.useEffect(() => {
    if (filter === undefined) return;
    if (filter === 'branch') {
      setMode('branch');
      setBoxes(
        props.flags.filter(elem => {
          return elem.section === 'grade';
        }),
      );
    } else {
      setMode(undefined);
      setBoxes(
        props.flags.filter(elem => {
          return elem.section === 'author';
        }),
      );
    }
  }, [filter, props.flags]);

  const back = React.useCallback(() => {
    if (mode === 'author' || mode === 'branch') return;
    if (mode === 'lesson' || (mode === 'finalize' && lastMode === 'branch')) {
      setMode('branch');
      setBoxes(
        props.flags.filter(elem => {
          return elem.section === 'grade';
        }),
      );
      setFilterId(undefined);
    } else if (
      mode === 'subject' ||
      (mode === 'finalize' && lastMode === 'lesson')
    ) {
      setBoxes(
        props.flags.filter(itr => {
          return itr.section === 'lesson' && itr.gradeId === filterId;
        }),
      );
      setMode('lesson');
    } else if (mode === 'finalize') {
      let tmp = props.flags.filter(itr => {
        return itr.section === 'subject' && itr.lessonId === filterId;
      });
      if (tmp.length > 0) {
        let tmpLesson = props.flags.find(itr => {
          return itr.section === 'lesson' && itr.id === filterId;
        });
        if (tmpLesson !== undefined) setFilterId(tmpLesson.gradeId);
      }
      setBoxes(tmp);
      setMode('subject');
    }
  }, [mode, props.flags, filterId, lastMode]);

  const addToSelected = shouldReturn => {
    if (
      easy > selectingItem.limitEasy ||
      mid > selectingItem.limitMid ||
      hard > selectingItem.limitHard
    ) {
      showError('تعداد سوالات انتخاب شده بیشتر از حد مجاز است.');
      return;
    }
    let tmp = [];
    selected.forEach(elem => tmp.push(elem));
    if (easy > 0) {
      let obj = JSON.parse(JSON.stringify(selectingItem));
      obj.level = 'easy';
      obj.count = easy;

      tmp.push(obj);
    }
    if (mid > 0) {
      let obj2 = JSON.parse(JSON.stringify(selectingItem));
      obj2.level = 'mid';
      obj2.count = mid;
      tmp.push(obj2);
    }
    if (hard > 0) {
      let obj3 = JSON.parse(JSON.stringify(selectingItem));
      obj3.level = 'hard';
      obj3.count = hard;
      tmp.push(obj3);
    }
    setSelectingItem(undefined);
    setEasy(0);
    setMid(0);
    setHard(0);
    setSelected(tmp);
    showSuccess();
    if (shouldReturn) {
      props.setSelected(tmp);
      props.toggleShowPopUp();
    } else back();
  };

  return (
    <LargePopUp
      title={Translate.search}
      btns={
        <PhoneView>
          {selected.length > 0 && mode !== 'finalize' && (
            <CommonButton
              onPress={() => {
                props.setSelected(selected);
                props.toggleShowPopUp();
              }}
              theme={'dark'}
              title={Translate.goToQuiz}
            />
          )}
          {mode === 'finalize' && (
            <CommonButton
              title={Translate.addAndContinue}
              theme={'dark'}
              onPress={() => {
                addToSelected(false);
              }}
            />
          )}
          {mode === 'finalize' && (
            <CommonButton
              title={Translate.addAndGoToQuiz}
              theme={'dark'}
              onPress={() => {
                addToSelected(true);
              }}
            />
          )}
        </PhoneView>
      }
      toggleShowPopUp={props.toggleShowPopUp}>
      <MyView style={styles.gap10}>
        {mode !== 'finalize' && (
          <SimpleText
            style={styles.colorDarkBlue}
            text={Translate.searchSubText}
          />
        )}

        {props.flags !== undefined && mode !== 'finalize' && (
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={Translate.searchInAll}
            subText={Translate.minChar}
            value={''}
            resultPane={true}
            setSelectedItem={item => {
              if (item === undefined) return;
              setSelectingItem(item);
              setMode('finalize');
            }}
            values={props.flags}
          />
        )}
        {mode !== 'finalize' && (
          <SimpleText style={styles.colorDarkBlue} text={Translate.orUseCats} />
        )}
        {/* {mode !== 'finalize' && (
          <PhoneView style={styles.gap10}>
            <CommonButton
              onPress={() => setFilter('branch')}
              theme={filter === 'branch' ? 'cream' : 'transparent'}
              title={commonTranslator.branch}
            />
            <CommonButton
              onPress={() => setFilter('author')}
              theme={filter === 'author' ? 'cream' : 'transparent'}
              title={commonTranslator.author}
            />
          </PhoneView>
        )} */}

        {mode === 'finalize' && selectingItem !== undefined && (
          <MyView>
            <EqualTwoTextInputs>
              <SimpleText style={styles.BlueBold} text={'تعداد سوالات مدنظر'} />
              <FontIcon
                onPress={() => back()}
                icon={faArrowLeft}
                theme={'rect'}
                back={'yellow'}
              />
            </EqualTwoTextInputs>

            <PhoneView style={{...styles.gap10, ...styles.alignSelfCenter}}>
              <JustBottomBorderTextInput
                placeholder={0}
                value={easy}
                justNum={true}
                onChangeText={e => setEasy(e)}
                subText={'تعداد کل سوالات آسان: ' + selectingItem.limitEasy}
                style={{textAlign: 'center'}}
                parentStyle={{width: 105, minWidth: 105}}
              />
              <JustBottomBorderTextInput
                placeholder={0}
                value={mid}
                justNum={true}
                onChangeText={e => setMid(e)}
                style={{textAlign: 'center'}}
                subText={'تعداد کل سوالات متوسط: ' + selectingItem.limitMid}
                parentStyle={{width: 105, minWidth: 105}}
              />
              <JustBottomBorderTextInput
                placeholder={0}
                value={hard}
                justNum={true}
                onChangeText={e => setHard(e)}
                subText={'تعداد کل سوالات سخت: ' + selectingItem.limitHard}
                style={{textAlign: 'center'}}
                parentStyle={{width: 105, minWidth: 105}}
              />
            </PhoneView>
          </MyView>
        )}

        {filter !== undefined && mode !== 'finalize' && (
          <MyView>
            <EqualTwoTextInputs>
              <SimpleText
                style={styles.BlueBold}
                text={commonTranslator.results}
              />
              {mode !== 'author' && mode !== 'branch' && (
                <FontIcon
                  onPress={() => back()}
                  icon={faArrowLeft}
                  theme={'rect'}
                  back={'yellow'}
                />
              )}
            </EqualTwoTextInputs>
            <PhoneView>
              {boxes !== undefined &&
                boxes.map((elem, index) => {
                  return (
                    <Card
                      key={index}
                      header={elem.name}
                      desc={
                        filter === 'author' || mode === 'branch'
                          ? undefined
                          : elem.desc
                      }
                      limitMid={elem.limitMid}
                      limitEasy={elem.limitEasy}
                      limitHard={elem.limitHard}
                      nextLevel={
                        mode === 'branch'
                          ? Translate.lessons
                          : mode === 'lesson'
                          ? Translate.subjects
                          : undefined
                      }
                      onSelect={() => {
                        setSelectingItem(elem);
                        setLastMode(mode);
                        setMode('finalize');
                      }}
                      onPress={() => {
                        if (mode === 'branch') {
                          setFilterId(elem.id);
                          setBoxes(
                            props.flags.filter(itr => {
                              return (
                                itr.section === 'lesson' &&
                                itr.gradeId === elem.id
                              );
                            }),
                          );
                          setMode('lesson');
                        } else if (mode === 'lesson') {
                          setFilterId(elem.id);
                          setBoxes(
                            props.flags.filter(itr => {
                              return (
                                itr.section === 'subject' &&
                                itr.lessonId === elem.id
                              );
                            }),
                          );
                          setMode('subject');
                        }
                      }}
                    />
                  );
                })}
            </PhoneView>
          </MyView>
        )}
      </MyView>
    </LargePopUp>
  );
}

export default Search;
