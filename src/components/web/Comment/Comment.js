import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import commonTranslator from '../../../translator/Common';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import Translate from './translate';
import Card from './Card';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import NewComment from './NewComment';

function Comment(props) {
  const [isOpen, setIsOpen] = useState(props.defaultIsOpen);
  const [writeNewComment, setWriteNewComment] = useState(false);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState();
  const [showMore, setShowMore] = useState(false);
  const [canWriteComment, setCanWriteComment] = useState(props.canWriteComment);

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getComments + props.refId + '/' + props.section + '/' + page,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) return;
      if (page == 1) setComments(res[0].comments);
      else setComments([...comments, ...res[0].comments]);
      setShowMore(res[0].hasNextPage);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  React.useEffect(() => {
    if (!isOpen || comments) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  React.useEffect(() => {
    if (page == 1) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <CommonWebBox
      btn={
        <SimpleFontIcon
          icon={isOpen ? faAngleDown : faAngleUp}
          onPress={() => setIsOpen(!isOpen)}
          kind="midSize"
        />
      }
      header={commonTranslator.comments}>
      {isOpen && (
        <MyView style={{gap: '10px'}}>
          {canWriteComment && !writeNewComment && (
            <SimpleText
              style={{cursor: 'pointer', color: 'red'}}
              onPress={() => {
                setWriteNewComment(true);
              }}
              text={Translate.newComment}
            />
          )}
          {writeNewComment && (
            <NewComment
              setLoading={props.setLoading}
              submited={() => {
                setWriteNewComment(false);
                setCanWriteComment(false);
              }}
              token={props.token}
              refId={props.refId}
              section={props.section}
            />
          )}
          {!writeNewComment && (
            <>
              {comments &&
                comments.map((e, index) => {
                  return <Card comment={e} key={index} />;
                })}
              {comments && comments.length === 0 && (
                <SimpleText text={Translate.noComments} />
              )}
            </>
          )}

          {showMore && !writeNewComment && (
            <SimpleText
              onPress={() => {
                setPage(page + 1);
              }}
              text={commonTranslator.showMore}
              style={{
                fontSize: '14px',
                color: 'red',
                fontWeight: 500,
                textAlign: 'center',
                cursor: 'pointer',
              }}
            />
          )}
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default Comment;
