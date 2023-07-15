import { useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import AWS from 'aws-sdk';
import { useDispatch } from 'react-redux';
import { deleteDriver } from '../../store/actions/driverActions';
import { deleteCab } from '../../store/actions/cabActions';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';  

const TableLayout = ({ rows, columns, tablename, handleState }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  AWS.config.update({
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    },
    region: process.env.REACT_APP_AWS_REGION,
  });
  const s3 = new AWS.S3();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    console.log("rows", rows)
    if (rows.length) {
      console.log("calling loadImages")
      loadImages()
    }
  }, [rows])

  const getImageSrc = (id) => {
    const image = images.find((img) => img.id === id);
    return image ? image.imageBase64 : '';
  };

  const loadImages = async () => {
    const imagePromises = rows.map(async (row) => {
      const params = {
        Bucket: "afourathon3images",
        Key: ""
        }
        tablename === 'Driver' ? params.Key = row.driverProfilePictureKey : params.Key = row.cabImageKey
        try {
          const data = await s3.getObject(params).promise();
          const imageBase64 = 'data:image/jpg;base64,' + data.Body.toString('base64');
          if (tablename === 'Driver') {
            return { id: row.driverId, imageBase64 };
          }
          else {
            return { id: row.cabId, imageBase64 };
          }
        }
        catch (e) {
          console.log(e)
        }
    })

    try {
      const imageResults = await Promise.all(imagePromises);
      console.log("All promises resolved: ", imageResults)
      const filteredImages = imageResults.filter((image) => image !== null);
      setImages(filteredImages);
      setLoaded(true)
      console.log("Images", images)
    }
    catch (e) {
      console.log(e)
    }

  }

  const handleDelete = async (id) => {
    console.log("id", id)
    if (tablename === 'Driver') {
      dispatch(deleteDriver(id))
      alert("Driver deleted")
      handleState()
      navigate('/drivers')
    }
    else {
      dispatch(deleteCab(id))
      alert("Cab deleted")
      handleState()
      navigate('/cabs')
    }
  }

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
            <Button component={Link} to={tablename === 'Driver' ? '/addDriver' : '/addCab'}
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
                                    <Link to={tablename === 'Driver' ? `/updateDriver/${row.driverId}` : `/updatecab/${row.cabId}`} >
                                      <EditIcon sx={{ width: 50 }} />
                                    </Link>
                                    <Link onClick={() => handleDelete(tablename === 'Driver' ? row.driverId : row.cabId)}>
                                      <DeleteIcon sx={{ width: 50 }} />
                                    </Link>
                                  </Box>
                                </>
                              ) : (
                                <>
                                  {column.id === 'driverProfilePictureKey' || column.id === 'cabImage' ? (
                                    <>
                                      {
                                        loaded ? <Avatar sx={{ width: '50px !important', height: '50px !important' }} alt="Remy Sharp" variant='square' src={tablename === 'Driver' ? getImageSrc(row.driverId) : getImageSrc(row.cabId)} /> : (<CircularProgress color="inherit" />)
                                      }

                                    </>
                                  ) : (
                                    <>
                                      {row[column.id]}
                                    </>
                                  )}

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