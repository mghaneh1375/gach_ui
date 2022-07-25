import {CommonWebBox, PhoneView} from '../../../../../styles/Common';
import Card from '../../card/Card';
import commonTranslator from '../../../../../tranlates/Common';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';

function List(props) {
  return (
    <CommonWebBox>
      <View style={{zIndex: 'unset'}}>
        <TextIcon
          onPress={() => props.setMode('create')}
          theme={'rect'}
          text={commonTranslator.packageQuiz}
          icon={faPlus}
        />
        <PhoneView style={{flexWrap: 'wrap'}}>
          {props.packages !== undefined &&
            props.packages.map((package_, index) => {
              return (
                <Card
                  afterRemove={props.afterRemove}
                  isAdmin={props.isAdmin}
                  key={index}
                  package={package_}
                  setLoading={props.setLoading}
                  token={props.token}
                  setMode={props.setMode}
                  setSelected={props.setSelected}
                />
              );
            })}
        </PhoneView>
      </View>
    </CommonWebBox>
  );
}

export default List;
