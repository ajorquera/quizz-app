import {useHistory} from 'react-router-dom';
import {authService} from '../utils/services';

export default (props) => {
  const history = useHistory();
  authService.logout().then(() =>  history.push('/login'));
  return null;
};