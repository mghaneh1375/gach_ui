import React, {useState} from 'react';
import {CommonRadioButton, MyView, PhoneView} from '../../../../styles/Common';
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
  const [subCats, setSubCats] = useState();

  React.useEffect(() => {
    if (props.item.subCats === undefined) return;
    let tmp = [];
    for (let i = 0; i < props.item.subCats.length; i++) {
      tmp.push({
        status:
          props.selected?.indexOf(props.item.subCats[i]) !== -1
            ? 'checked'
            : 'unchecked',
        label: props.item.subCats[i],
      });
    }
    setSubCats(tmp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.item]);

  if (status === undefined) return <></>;

  if (props.item.subCats === undefined)
    return (
      <CommonRadioButton
        onPress={() => changeStatus(props.item.label)}
        status={status}
        textStyle={{alignSelf: 'center', fontSize: 12}}
        style={{height: 35}}
        text={props.item.label}
        isCheckBox={props.checkbox !== undefined ? props.checkbox : undefined}
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
      <PhoneView style={{paddingBottom: 10}}></PhoneView>

      <MyView style={{minWidth: 200}}>
        {subCats !== undefined &&
          subCats.map((elem, index) => {
            return (
              <CommonRadioButton
                onPress={() => changeSubCatStatus(index)}
                status={elem.status}
                text={elem.label}
                textStyle={{fontSize: 13, color: vars.DARK_SILVER}}
                key={index}
                isCheckBox={true}
              />
            );
          })}
      </MyView>
    </MyView>
  );
}

export default FilterItem;
