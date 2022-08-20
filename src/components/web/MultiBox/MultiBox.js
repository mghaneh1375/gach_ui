import React, {useState} from 'react';
import {PhoneView} from '../../../styles/Common';
import Box from './Box';

const MultiBox = props => {
  const [items, setItems] = useState();

  React.useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  return (
    <PhoneView style={{border: 0}}>
      {items !== undefined &&
        items.map((elem, index) => {
          return (
            <Box
              key={index}
              removeItem={() => props.onRemoveClick(elem.id)}
              title={
                elem.title !== undefined
                  ? elem.title
                  : elem.name !== undefined
                  ? elem.name
                  : ''
              }
            />
          );
        })}
    </PhoneView>
  );
};

export default MultiBox;
