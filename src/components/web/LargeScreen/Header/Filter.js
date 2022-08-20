import {Device} from '../../../../models/Device';
import {getDevice} from '../../../../services/Utility';
import {style} from './style';

function Filter(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;

  if (isLargePage) {
    return (
      <div className="menu-item-container" style={style.MenuJustLarge}></div>
    );
  }

  return <></>;
}

export default Filter;
