import React, {useState} from 'react';
import {PhoneView, SimpleText} from '../../../styles/Common';
import vars from '../../../styles/root';

function Pagination({perPage, totalCount, pageIndex, setPageIndex}) {
  const [elems, setElems] = useState();
  React.useEffect(() => {
    const tmp = Math.ceil(totalCount / perPage);
    const arr = [];
    let more = false;
    for (let i = 1; i <= tmp; i++) {
      if (i < 4 || Math.abs(pageIndex - i) < 3 || tmp - i < 3) {
        arr.push(i);
        more = false;
      } else if (!more) {
        arr.push(-1);
        more = true;
      }
    }
    setElems(arr);
  }, [totalCount, perPage, pageIndex]);

  return (
    <PhoneView
      style={{
        gap: '10px',
        direction: 'ltr',
        justifyContent: 'center',
      }}>
      {elems &&
        elems.map((e, index) => {
          if (e !== -1)
            return (
              <SimpleText
                key={index}
                onPress={() => setPageIndex(e)}
                text={e}
                style={{
                  color: e == pageIndex ? 'red' : vars.DARK_BLUE,
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              />
            );
          else
            return (
              <SimpleText
                key={index}
                text={'...'}
                style={{
                  fontSize: '16px',
                }}
              />
            );
        })}
    </PhoneView>
  );
}

export default Pagination;
