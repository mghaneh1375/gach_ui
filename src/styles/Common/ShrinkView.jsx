import MyView from './MyView';

const ShrinkView = props => {
  const style1 = {
    flexShrink: 1,
  };

  const allStyles =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  let viewProps = {
    style: allStyles,
  };

  if (props.onClick !== undefined) viewProps.onClick = props.onClick;

  return <MyView {...viewProps}>{props.children}</MyView>;
};

export default ShrinkView;
