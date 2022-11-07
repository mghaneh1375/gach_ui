import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {
  CommonRadioButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import vars from '../../../../styles/root';

function FilterItem(props) {
  const [status, setStatus] = useState();

  React.useEffect(() => {
    if (props.status === undefined) return;
    setStatus(props.status);
  }, [props.status]);

  const changeStatus = label => {
    if (props.isAll !== undefined && status === 'checked') return;
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
    props.onPress(label);
  };
  const [expand, setExpand] = useState(false);
  const [subCats, setSubCats] = useState();

  React.useEffect(() => {
    if (props.item.subCats === undefined) return;
    let tmp = [];
    for (let i = 0; i < props.item.subCats.length; i++) {
      tmp.push({status: 'unchecked', label: props.item.subCats[i]});
    }
    setSubCats(tmp);
  }, [props.item]);

  if (status === undefined) return <></>;

  if (props.item.subCats === undefined)
    return (
      <CommonRadioButton
        onPress={() => changeStatus(props.item.label)}
        status={status}
        text={props.item.label}
      />
    );

  const changeSubCatStatus = idx => {
    let currLabel = '';
    setSubCats(
      subCats.map((elem, index) => {
        if (index !== idx) return elem;
        currLabel = elem.label;
        elem.status = elem.status === 'checked' ? 'unchecked' : 'checked';
        return elem;
      }),
    );
    props.onPress(currLabel);
  };

  return (
    <MyView>
      <PhoneView>
        <SimpleFontIcon
          onPress={() => setExpand(!expand)}
          theme="full"
          parentStyle={{width: 20, heigth: 20}}
          style={{color: vars.DARK_SILVER}}
          icon={expand ? faMinus : faPlus}
        />
        <SimpleText
          style={{
            color: vars.DARK_SILVER,
            alignSelf: 'center',
            paddingRight: 10,
          }}
          text={props.item.label}
          onPress={() => setExpand(!expand)}
        />
      </PhoneView>
      {expand && (
        <MyView style={{paddingRight: 20, minWidth: 200}}>
          {subCats !== undefined &&
            subCats.map((elem, index) => {
              return (
                <CommonRadioButton
                  onPress={() => changeSubCatStatus(index)}
                  status={elem.status}
                  text={elem.label}
                  style={{color: vars.DARK_SILVER}}
                  key={index}
                  isCheckBox={true}
                />
              );
            })}
        </MyView>
      )}
    </MyView>
  );
}

export default FilterItem;
