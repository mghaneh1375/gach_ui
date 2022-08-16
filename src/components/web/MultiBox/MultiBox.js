import React, {useState} from 'react';
import {removeAccess} from '../../../screens/panel/users/components/Utility';
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
              removeItem={() =>
                removeAccess({
                  setLoading: props.setLoading,
                  token: props.token,
                  userId: props.userId,
                  afterFunc: props.afterFunc,
                  access: elem.id,
                })
              }
              title={elem.title}
            />
          );
        })}
    </PhoneView>
  );
};

export default MultiBox;
