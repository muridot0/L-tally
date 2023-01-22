import { useContext } from "react";
import AddPerson from "../../components/AddPerson/AddPerson";
import { SpaceContext } from "../../contexts/space";
import { OpenContext } from "../Home/Home";




function DefaultPage() {
  const {open} = useContext(OpenContext);
  const {activeMenuItem}= useContext(SpaceContext)

  return (
        <AddPerson tally={[]} openNav={open} spaceId={activeMenuItem} />
  )
}

export default DefaultPage;
