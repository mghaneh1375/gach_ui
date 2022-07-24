import {faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox, PhoneView, SimpleText} from '../../../../styles/Common';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import {fetchPackageQuizzes} from './Utility';
import Translate from '../Translate';
import Quizzes from '../../../../components/web/Quizzes';
import {routes} from '../../../../API/APIRoutes';

function Detail(props) {
  const [isWorking, setIsWorking] = useState(false);
  const [selectingQuiz, setSelectingQuiz] = useState(false);

  React.useEffect(() => {
    if (isWorking || props.package.quizzesDoc !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([fetchPackageQuizzes(props.token, props.package.id)]).then(
      res => {
        props.setLoading(false);
        setIsWorking(false);
        if (res[0] === null) {
          props.setMode('list');
          return;
        }
        props.package.quizzesDoc = res[0];
        props.setPackage(props.package);
      },
    );
  }, [props, isWorking]);

  return (
    <View>
      {selectingQuiz && (
        <CommonWebBox
          backBtn={true}
          onBackClick={() => setSelectingQuiz(false)}>
          <Quizzes
            fetchUrl={routes.fetchIRYSCRegistrableQuizzes}
            token={props.token}
            setLoading={props.setLoading}
          />
        </CommonWebBox>
      )}

      {!selectingQuiz && (
        <CommonWebBox>
          <View>
            <TextIcon
              onPress={() => setSelectingQuiz(true)}
              theme={'rect'}
              text={Translate.packageQuizzes + props.package.title}
              icon={faPlus}
            />
            <PhoneView style={{flexWrap: 'wrap'}}>
              {props.package.quizzesDoc !== undefined &&
                props.package.quizzesDoc.map((quiz, index) => {
                  return (
                    <SimpleText text={quiz.title} />
                    // <Card
                    //   key={index}
                    //   quiz={quiz}
                    //   setLoading={props.setLoading}
                    //   token={props.token}
                    // />
                  );
                })}
            </PhoneView>
          </View>
        </CommonWebBox>
      )}
    </View>
  );
}

export default Detail;
