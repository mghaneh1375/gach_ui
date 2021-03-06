import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View} from 'react-native';
import RadioButtonYesOrNo from '../../../../../components/web/RadioButtonYesOrNo';
import {
  CommonButton,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import vars from '../../../../../styles/root';
import commonTranslator from '../../../../../tranlates/Common';
import translator from '../../Translator';
import {filter} from '../Utility';

function Filter(props) {
  const [showProSearch, setShowProSearch] = useState(false);
  const [wantedIcon, setWantedIcon] = useState(faAngleDoubleDown);
  const [criticalThresh, setCriticalThresh] = useState();
  const [grade, setGrade] = useState();
  const [lesson, setLesson] = useState();
  const [lessons, setLessons] = useState();
  const [justCriticals, setJustCriticals] = useState(false);

  React.useEffect(() => {
    if (grade === undefined) return;

    let allLessons = props.grades
      .find(elem => elem.id === grade)
      .lessons.map(elem => {
        return {id: elem.id, item: elem.name};
      });
    allLessons.push({id: undefined, item: commonTranslator.all});
    setLessons(allLessons);
  }, [grade, props.grades]);

  const toggleShowProSearch = () => {
    if (showProSearch) setWantedIcon(faAngleDoubleDown);
    else setWantedIcon(faAngleDoubleUp);
    setShowProSearch(!showProSearch);
  };

  return (
    <View style={{zIndex: 'unset'}}>
      <PhoneView>
        <JustBottomBorderSelect
          isHalf={true}
          placeholder={translator.grade}
          setter={setGrade}
          value={props.grades.find(elem => {
            return elem.id === grade;
          })}
          values={props.grades}
        />

        <JustBottomBorderSelect
          isHalf={true}
          placeholder={translator.lessonName}
          setter={setLesson}
          value={
            lessons !== undefined
              ? lessons.find(elem => {
                  return elem.id === lesson;
                })
              : ''
          }
          values={lessons !== undefined ? lessons : []}
        />
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res = await filter(
              props.token,
              grade,
              lesson,
              undefined,
              criticalThresh,
              justCriticals,
            );
            props.setLoading(false);
            if (res !== null) props.setData(res);
          }}
          isHalf={true}
          title={commonTranslator.show}
          style={{alignSelf: 'flex-start'}}
        />
      </PhoneView>
      <PhoneView>
        <SimpleText
          onPress={() => toggleShowProSearch()}
          style={{
            paddingTop: 15,
            paddingrRight: 15,
            paddingBottom: 15,
            cursor: 'pointer',
            color: vars.DARK_BLUE,
          }}
          text={commonTranslator.advancedSearch}
        />
        <View
          style={{
            width: 20,
            height: 20,
            alignSelf: 'center',
          }}>
          <SimpleFontIcon
            style={{
              color: vars.DARK_BLUE,
            }}
            icon={wantedIcon}
          />
        </View>
      </PhoneView>
      {showProSearch && (
        <View style={{zIndex: 'unset'}}>
          <PhoneView style={{zIndex: 'unset'}}>
            <JustBottomBorderTextInput
              placeholder={translator.criticalThresh}
              subText={translator.criticalThresh}
              onChangeText={e => setCriticalThresh(e)}
              value={criticalThresh}
              isHalf={true}
            />
            <View style={{marginTop: 10}}>
              <RadioButtonYesOrNo
                label={translator.justCriticals}
                selected={justCriticals}
                setSelected={setJustCriticals}
              />
            </View>
          </PhoneView>
        </View>
      )}
    </View>
  );
}

export default Filter;
