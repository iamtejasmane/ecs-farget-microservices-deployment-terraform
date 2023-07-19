import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCabDrivers } from '../../store/actions/cabDriverActions';
import CabDriverTable from './cabDriverTable';

const CabDriver = () => {
    const dispatch = useDispatch();
    const assignments = useSelector((state) => state.assignments.assignments)
    const error = useSelector((state) => state.assignments.error)
   
    const columns = [
        { id: "driverName", label: "Name", align: "center" },
        { id: "cab", label: "Cab model/ Registration number", align: 'center'},
        { id: "edit", label: "", minWidth: 100}
      ];

    
    useEffect(() => {
        dispatch(fetchAllCabDrivers());
      }, [dispatch]);


    return(
        <>
          {error ? alert(error.error) : <></>}
           <CabDriverTable rows={assignments} columns = {columns} />
        </>
    )
}

export default CabDriver