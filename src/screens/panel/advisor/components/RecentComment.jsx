import {SimpleText} from '@/styles';
import commonTranslator from '@/translator/common';

function RecentComment({comment}) {
  return (
    <>
      <SimpleText text={comment.comment} />
      <SimpleText
        text={`${commonTranslator.createdAt}: ${comment.created_at}`}
      />
    </>
  );
}

export default RecentComment;
