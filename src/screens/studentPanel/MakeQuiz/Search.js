import {
  CommonButton,
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

function Search(props) {
  const [filter, setFilter] = useState();
  const [boxes, setBoxes] = useState();
  const [mode, setMode] = useState();

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

  return (
    <LargePopUp
      title={Translate.search}
      toggleShowPopUp={props.toggleShowPopUp}>
      <MyView style={styles.gap10}>
        <SimpleText
          style={styles.colorDarkBlue}
          text={Translate.searchSubText}
        />

        {props.flags !== undefined && (
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={Translate.searchInAll}
            subText={Translate.minChar}
            value={props.wantedFlag !== undefined ? props.wantedFlag.name : ''}
            resultPane={true}
            setSelectedItem={item => {
              props.setWantedFlag(item);
            }}
            values={props.flags}
          />
        )}
        <SimpleText style={styles.colorDarkBlue} text={Translate.orUseCats} />
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

        {filter !== undefined && (
          <MyView>
            <SimpleText
              tyle={styles.colorDarkBlue}
              text={commonTranslator.results}
            />
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
                        props.setWantedFlag(elem);
                        props.toggleShowPopUp();
                      }}
                      onPress={() => {
                        if (mode === 'branch') {
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
