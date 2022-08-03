import StudentMenu from './Menus/Student';
import AdminMenu from './Menus/Admin';
import Agent from './Menus/Agent';

const Menu = props => {
  if (props.accesses === null) return <></>;
  if (props.accesses.indexOf('student') !== -1)
    return <StudentMenu navigate={props.navigate} />;
  if (props.accesses.indexOf('agent') !== -1)
    return <Agent navigate={props.navigate} />;
  if (props.accesses.indexOf('school') !== -1)
    return <StudentMenu navigate={props.navigate} />;
  if (props.accesses.indexOf('admin') !== -1)
    return <AdminMenu navigate={props.navigate} />;
};

export default Menu;
