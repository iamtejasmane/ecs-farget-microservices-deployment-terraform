import {useEffect, useState} from 'react';
import TableLayout from '../layout/tablelayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCabs } from '../../store/actions/cabActions';

const Cabs = () => {
  const dispatch = useDispatch();
  const cabs = useSelector((state) => state.cabs)
  const [stateCount, setStateCount] = useState(0);

  useEffect(() => {
    dispatch(fetchAllCabs());
  }, [dispatch, stateCount]);

  const handleState = () => {
    console.log("stateCount: ", stateCount + 1)
    setStateCount(stateCount + 1);
 }


    const tableName = "Cab";
    const columns = [
        { id: "cabImage", label: "" },
        { id: "cabModel", label: "Car Model", align: "center" },
        { id: "cabColour", label: "Car Colour", align: 'center'},
        { id: "cabRegistrationNumber", label: "Cab Number", align: 'center'},
        { id: "edit", label: "", minWidth: 100}
      ];
      

    return(
        <>
            <TableLayout key={stateCount} rows={cabs} columns={columns} tablename={tableName} handleState={handleState}/>
        </>
    )
}

export default Cabs