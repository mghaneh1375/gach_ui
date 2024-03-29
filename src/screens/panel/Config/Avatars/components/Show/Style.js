import vars from '../../../../../../styles/root';

const style = {
  avatar: {
    width: 200,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: 'rgb(0 0 0 / 10%) .2px 0px 3px 6px',
    gap: 30,
    flexWrap: 'wrap',
  },
  defaultText: {
    fontSize: 18,
    alignSelf: 'center',
    margin: 5,
    color: vars.DARK_BLUE,
  },
  pic: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    border: '5px solid #e7e5e5ad',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  font13: {
    fontSize: 13,
    justifySelf: 'center',
    textAlign: 'center',
  },
};
export default style;
