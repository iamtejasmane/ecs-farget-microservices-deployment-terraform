import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCabDrivers } from '../../store/actions/cabDriverActions';
import CabDriverTable from './cabDriverTable';

const CabDriver = () => {
    const dispatch = useDispatch();
    const assignments = useSelector((state) => state.assignments)
    const [stateCount, setStateCount] = useState(0);
   
    const columns = [
        { id: "driverName", label: "Name", align: "center" },
        { id: "cab", label: "Cab model/ Registration number", align: 'center'},
        { id: "edit", label: "", minWidth: 100}
      ];

      //to Re-render the component and getting updated values from store
      const handleState = () => {
        setStateCount(stateCount + 1);
    }
    
    useEffect(() => {
        dispatch(fetchAllCabDrivers());
      }, [dispatch,stateCount]);


    return(
        <>
           <CabDriverTable rows={assignments} columns = {columns} handleState={handleState}/>
        </>
    )
}

export default CabDriver