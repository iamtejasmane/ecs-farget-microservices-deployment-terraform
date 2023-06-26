import * as React from 'react';
import TableLayout from '../layout/tablelayout';

const Cabs = () => {

    const tableName = "Cab";
    const columns = [
        { id: "profileUrl", label: "" },
        { id: "name", label: "Name", align: "center" },
        { id: "email", label: "email", align: 'center'},
        { id: "contact", label: "Mobile Number", align: 'center'},
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
            <TableLayout rows={rows} columns={columns} tablename={tableName}/>
        </>
    )
}

export default Cabs