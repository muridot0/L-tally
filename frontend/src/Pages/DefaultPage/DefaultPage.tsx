import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPerson from '../../components/AddPerson/AddPerson';
import { LoginContext } from '../../contexts/login';
import { SpaceContext } from '../../contexts/space';
import { OpenContext } from '../Home/Home';

function DefaultPage() {
  const navigate = useNavigate();
  const { open } = useContext(OpenContext);
  const { activeMenuItem } = useContext(SpaceContext);
  const {tallies} = useContext(LoginContext)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/login');
      window.location.reload();
    }
  });

  return <AddPerson openNav={open} spaceId={activeMenuItem} tallies={tallies}/>;
}

export default DefaultPage;
