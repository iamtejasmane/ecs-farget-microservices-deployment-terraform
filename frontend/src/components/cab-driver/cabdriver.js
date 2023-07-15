import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllCabDrivers } from '../../store/actions/cabDriverActions';
import CabDriverTable from './cabDriverTable';

const CabDriver = () => {
    const dispatch = useDispatch();
    const assignments = useSelector((state) => state.assignments)
    const [loading, setLoading] = useState(true)
   
    const columns = [
        { id: "driverName", label: "Name", align: "center" },
        { id: "cab", label: "Cab model/ Registration number", align: 'center'},
        { id: "edit", label: "", minWidth: 100}
      ];
    
    useEffect(() => {
        dispatch(fetchAllCabDrivers());
        setLoading(false)
      }, [dispatch]);

    return(
        <>
           <CabDriverTable rows={assignments} columns = {columns} />
        </>
    )
}

export default CabDriver