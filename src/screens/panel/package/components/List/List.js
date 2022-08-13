import {CommonWebBox, PhoneView} from '../../../../../styles/Common';
import Card from '../../card/Card';
import commonTranslator from '../../../../../tranlates/Common';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';

function List(props) {
  return (
    <CommonWebBox
      header={commonTranslator.packageQuiz}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      <MyView style={{zIndex: 'unset'}}>
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
      </MyView>
    </CommonWebBox>
  );
}

export default List;
