import React, {useState} from 'react';
import {PhoneView} from '../../../styles/Common';
import Box from './Box';

const MultiBox = props => {
  const [items, setItems] = useState();

  React.useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  return (
    <PhoneView>
      {items !== undefined &&
        items.map((elem, index) => {
          return (
            <Box
              key={index}
              id={elem.id}
              removeItem={props.removeItem}
              title={elem.title}
            />
          );
        })}
    </PhoneView>
  );
};

export default MultiBox;
