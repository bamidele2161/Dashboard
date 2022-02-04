import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { editUser, updateUser, } from '../redux/actions';

const EditUser = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
    });
    const {name, email} = state;

    const [error, setError] = useState("");

    let navigate = useNavigate();

    let dispatch = useDispatch();
    let {id} = useParams();
    const {user} = useSelector(state => state.data);

    useEffect(() => { 
        dispatch(editUser(id))
    },[dispatch, id])

    useEffect(() => {
        if(user) {
            setState({...user});
        }
    }, [user])
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email) {
            setError("Please input all field");
        }
        else {
            dispatch(updateUser(state, id));
            navigate("/home");
            setError("");
        }
    }

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value});
    }
  return (
    <div className="add-user-container">

        {error && <h3 style={{color: "red", alighText: "center", marginTop: "20px"}}>{error}</h3> }
        <h1 style={{marginTop: "20px"}}>Edit User</h1>

        <div 
            className="add-form" 
            style={{ 
                borderRadius: "10px", 
                padding: "0px 50px",
            }}
            onSubmit={handleSubmit}
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
                    value={name || ""} 
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
                    value={email || ""} 
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                />

                <Stack spacing={2} direction="row" style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", marginLeft: "-95px"}}>
                <Button variant="outlined" onClick={() => navigate("/home")}>Cancel</Button>
                    <Button variant="contained" color="success" type="submit">Update</Button>
                </Stack>
            </Box>

            
        </div>
    </div>
  )
};

export default EditUser;
