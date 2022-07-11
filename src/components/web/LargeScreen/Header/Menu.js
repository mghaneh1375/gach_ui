import StudentMenu from './Menus/Student';
import AdminMenu from './Menus/Admin';

const Menu = props => {
  if (props.accesses.indexOf('student') !== -1)
    return <StudentMenu navigate={props.navigate} />;
  if (props.accesses.indexOf('admin') !== -1)
    return <AdminMenu navigate={props.navigate} />;
};

export default Menu;
