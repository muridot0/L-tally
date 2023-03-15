import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPerson from '../../components/AddPerson/AddPerson';
import { LoginContext } from '../../contexts/login';
import { SpaceContext } from '../../contexts/space';

function DefaultPage() {
  const navigate = useNavigate();
  const { openDrawer } = useContext(SpaceContext);
  const { activeMenuItem } = useContext(SpaceContext);
  const {tallies} = useContext(LoginContext)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/login');
      window.location.reload();
    }
  });

  return <AddPerson openNav={openDrawer} spaceId={activeMenuItem} tallies={tallies}/>;
}

export default DefaultPage;
