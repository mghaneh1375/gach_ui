import PhoneView from './PhoneView';

const EqualTwoTextInputs = props => {
  const allStyle =
    props.style === undefined
      ? {
          justifyContent: 'space-between',
        }
      : {
          ...props.style,
          ...{
            justifyContent: 'space-between',
          },
        };

  return <PhoneView style={allStyle}>{props.children}</PhoneView>;
};

export default EqualTwoTextInputs;
