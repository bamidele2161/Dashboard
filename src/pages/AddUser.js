import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions';

const AddUser = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
    });
    const {name, email} = state;

    const [error, setError] = useState("");

    let navigate = useNavigate();

    let dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email) {
            setError("Please input all fields");
        }
        else {
            dispatch(addUser(state));
            navigate("/");
            setError("");
        }
    }

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value});
    }
  return (
    <div className="add-user-container">
        
        {error && <p style={{color: "red", alighText: "center", marginTop: "20px"}}>{error}</p> }
        <h1 style={{marginTop: "20px"}}>Add User</h1>

        <div 
            className="add-form" 
            onSubmit={handleSubmit}
            style={{
                borderRadius: "10px",
                padding: "0px 50px"
            }}
        > 
            <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                marginTop="50px"

                style={{
                    borderRadius: "10px",
                    padding: "40px",
                    boxShadow: "2px 2px 5px 4px rgb(227, 227, 227)"
                }}
            >
                <TextField 
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined" 
                    placeholder="Name" 
                    value={name} 
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                />
                <br />

                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    placeholder="Email" 
                    value={email} 
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                />


                <Stack spacing={2} direction="row" style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", marginLeft: "-95px"}}>
                    <Button variant="outlined" onClick={() => navigate("/")}>Cancel</Button>
                    <Button variant="contained" color="success" type="submit">Submit</Button>
                </Stack>
            </Box>

            
        </div>
    </div>
  )
};

export default AddUser;
