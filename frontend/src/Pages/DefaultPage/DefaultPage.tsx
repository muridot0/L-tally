import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPerson from '../../components/AddPerson/AddPerson';
import { SpaceContext } from '../../contexts/space';
import { OpenContext } from '../Home/Home';

function DefaultPage() {
  const navigate = useNavigate();
  const { open } = useContext(OpenContext);
  const { activeMenuItem } = useContext(SpaceContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/login');
      window.location.reload();
    }
  });

  return <AddPerson tally={[]} openNav={open} spaceId={activeMenuItem} />;
}

export default DefaultPage;
