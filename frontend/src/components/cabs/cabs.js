import {useEffect} from 'react';
import TableLayout from '../layout/tablelayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCabs } from '../../store/actions/cabActions';

const Cabs = () => {
  const dispatch = useDispatch();
  const cabs = useSelector((state) => state.cabs)

  useEffect(() => {
    dispatch(fetchAllCabs());
  }, [dispatch]);


    const tableName = "Cab";
    const columns = [
        { id: "cabImage", label: "" },
        { id: "cabModel", label: "Car Model", align: "center" },
        { id: "cabColour", label: "Car Colour", align: 'center'},
        { id: "cabRegistrationNumber", label: "Cab Number", align: 'center'},
        { id: "edit", label: "", minWidth: 100}
      ];
      
      const rows = [
        {
          profileUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          name: "Test Driver",
          email: "test.driver@gmail.com",
          contact: 9527230546,
          id: 1
        },
        {
          profileUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          name: "Test Driver",
          email: "test.driver@gmail.com",
          contact: 9527230546,
          id: 1
        },
      ];
    return(
        <>
            <TableLayout rows={cabs} columns={columns} tablename={tableName}/>
        </>
    )
}

export default Cabs