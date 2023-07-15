import React,{ useEffect, useState } from 'react';
import TableLayout from '../layout/tablelayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllDrivers } from '../../store/actions/driverActions';

const Drivers = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers)
  const [stateCount, setStateCount] = useState(0);

  useEffect(() => {
    dispatch(fetchAllDrivers());
  }, [dispatch,stateCount]);

  const handleState = () => {
    setStateCount(stateCount + 1);
 }

    const tableName = "Driver";
    const columns = [
        { id: "driverProfilePictureKey", label: "" },
        { id: "driverName", label: "Name", align: "center" },
        { id: "driverEmail", label: "email", align: 'center'},
        { id: "driverPhoneNumber", label: "Mobile no", align: 'center'},
        { id: "driverLicenseNo", label: "License no", align: 'center'},
        { id: "edit", label: "", minWidth: 100}
      ];
      
    return(
        <>
          <TableLayout key={stateCount} rows={drivers} columns={columns} tablename={tableName} handleState={handleState}/>
        </>
    )
}

export default Drivers