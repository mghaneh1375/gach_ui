import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {CommonRadioButton, MyView} from '../../../../styles/Common';
import {SimpleTextIcon} from '../../../../styles/Common/TextIcon';

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
      <SimpleTextIcon
        onPress={() => setExpand(!expand)}
        text={props.item.label}
        icon={expand ? faMinus : faPlus}
      />
      {expand && (
        <MyView style={{paddingRight: 20}}>
          {subCats !== undefined &&
            subCats.map((elem, index) => {
              return (
                <CommonRadioButton
                  onPress={() => changeSubCatStatus(index)}
                  status={elem.status}
                  text={elem.label}
                  key={index}
                />
              );
            })}
        </MyView>
      )}
    </MyView>
  );
}

export default FilterItem;
