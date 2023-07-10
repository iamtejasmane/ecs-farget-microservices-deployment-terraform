import React,{ useEffect } from 'react';
import TableLayout from '../layout/tablelayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllDrivers } from '../../store/actions/driverActions';

const Drivers = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers)

  useEffect(() => {
    dispatch(fetchAllDrivers());
  }, [dispatch]);

    const tableName = "Driver";
    const columns = [
        { id: "driverProfilePictureKey", label: "" },
        { id: "driverName", label: "Name", align: "center" },
        { id: "driverEmail", label: "email", align: 'center'},
        { id: "driverPhoneNumber", label: "Mobile Number", align: 'center'},
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
          name: "Test Driver 2",
          email: "test.driver2@gmail.com",
          contact: 9527230546,
          id: 2
        },
        {
            profileUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Test Driver 3",
            email: "test.driver3@gmail.com",
            contact: 9527230546,
            id: 3
          },
      ];

    return(
        <>
            <TableLayout rows={drivers} columns={columns} tablename={tableName}/>
            
        </>
    )
}

export default Drivers