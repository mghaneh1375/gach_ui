import React from 'react';
import {MyView, PhoneView, SimpleText} from '../../../styles/Common';

function CommentCard(props) {
  return (
    <PhoneView style={{alignItems: 'center', gap: '10px'}}>
      <MyView>
        <SimpleText
          style={{textAlign: 'center', fontSize: '11px'}}
          text={props.comment.createdAt}
        />
      </MyView>
      <SimpleText text={props.comment.comment} />
    </PhoneView>
  );
}

export default CommentCard;
