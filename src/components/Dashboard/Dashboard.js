import React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux'
import {loadUsers, deleteUser} from '../../redux/actions'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useNavigate} from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const Dashboard = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
    const {users} = useSelector((state) => state.data)

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this user ?")) {
      dispatch(deleteUser(id));
    };
  };
  return(
    <div className="dashboard-container">
        <div className="navbar-container">
            <h1 className="navbar-brand" style={{fontSize: "40px"}}>User List</h1>
        </div>

        <div className="user-botton">
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button color="primary" 
              onClick={() => navigate('/addUser')}
            >Add New User</Button>
          </ButtonGroup>
        </div>

        <TableContainer component={Paper} style={{marginTop:"50px"}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody> 
              {users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.name}</StyledTableCell>
                  <StyledTableCell align="center">{user.username}</StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">{user?.address?.city}</StyledTableCell>

                  <StyledTableCell align="center">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button color="warning"
                      onClick={() => navigate(`/editUser/${user.id}`)}>Edit</Button>
                    </ButtonGroup>
                  </StyledTableCell>
                  
                  <StyledTableCell align="center">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button 
                      color="error"
                      onClick={() => handleDelete(user.id)}
                      >Delete</Button>
                    </ButtonGroup>
                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
    </TableContainer>
    </div>
  );
};

export default Dashboard;
