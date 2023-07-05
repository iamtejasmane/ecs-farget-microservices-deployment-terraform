import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from '@mui/material/Avatar';
import DetailsModal from './modal';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDriver } from '../../store/actions/driverActions';

const TableLayout = ({ rows, columns, tablename }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedRow, setSelectedRow] = useState(null);
  
  // const handleOpenModal = (id) => {
  //   setSelectedRow(id)
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 10 }}>
          <Box><p className='list-header'>{tablename} List</p></Box>
          <Box>
            <Button component={Link} to={tablename === 'Driver' ? '/addDriver': '/addCab' } 
              variant="outlined" 
              sx={{ color: 'black', width: 180, mt: 2.5 }} 
              className='card-button'
              >
                Add {tablename}
            </Button>
          </Box>
        </Box>
        <Divider />
        <Container>
          <TableContainer
            sx={{
              maxHeight: 440,
              "&::-webkit-scrollbar": {
                display: "none"
              },
            }}
          >
            <Table stickyHeader aria-label="">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{ "& td": { border: 0 } }}
                      >
                        {columns.map((column) => (
                          <>
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'edit' ? (
                                <>
                                  <Box>
                                    <Link to={tablename === 'Driver' ? `/updateDriver/${row.driverId}` : `/updatecab/${row.id}` } >
                                      <EditIcon sx={{ width: 50 }} />
                                    </Link>
                                    <Link>
                                      <DeleteIcon sx={{ width: 50 }} />
                                    </Link>
                                  </Box>
                                </>
                              ) : (
                                <>
                                  {row[column.id]=== 'driverProfilePicture' || row[column.id]=== 'cabImage' ? (
                                    <>
                                      <Avatar sx={{ width: '50px !important', height: '50px !important' }} alt="Remy Sharp" variant='square' src={row[column.id]} />
                                    </>
                                  ) : (
                                    <>
                                      {row[column.id]}
                                    </>
                                  )}

                                  {/* (
                                    <>
                                      {column.id === 'driverName' || column.id === 'cabModel' ? (
                                      <> 
                                        <button onClick={() => {tablename === 'Driver' ? handleOpenModal(row.driverId) : handleOpenModal(row.cabId)}} href='' className="open-modal">{row[column.id]}</button>
                                        {selectedRow ? <DetailsModal open={isModalOpen} onClose={handleCloseModal} id={selectedRow}/> : (<></>)}
                                      </>
                                      ) : (<>{row[column.id]} </>)}
                                    </>
                                  )} */}

                                </>
                              )}
                            </TableCell>
                          </>
                        ))}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Container>
    </>
  )
}

export default TableLayout