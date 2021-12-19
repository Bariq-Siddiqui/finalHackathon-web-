import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
// import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, query } from "firebase/firestore";
// const firebaseConfig = {
//     apiKey: "AIzaSyC7ylprcCTWJ7tk3Zfo96Qtw1DewIEIwsc",
//     authDomain: "firestore-todoapp-fe704.firebaseapp.com",
//     projectId: "firestore-todoapp-fe704",
//     storageBucket: "firestore-todoapp-fe704.appspot.com",
//     messagingSenderId: "329344079385",
//     appId: "1:329344079385:web:6ad3ed7c03014c4e153c88"
// };

// initializeApp(firebaseConfig);

const db = getFirestore();
const userCol = collection(db, "requestForm")

function Dashboard() {
    const [requestForm, setrequestForm] = useState([]);
    useEffect(() => {

        const q = query(userCol);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let requestForm = [];
            snapshot.forEach((doc) => {
                let data = doc.data();
                let id = doc.id
                requestForm.unshift(
                    {
                        name: data.name,
                        fatherName: data.fatherName,
                        cnic: data.cnic,
                        DateOfBirth: data.dob,
                        fmember: data.fmember,
                        status: data.status,
                        // id: id,
                    }
                )
            })
            setrequestForm(requestForm)
        });
        return () => {
            unsubscribe()
            console.log("unsub")
        };
    }, []);
    return (
        <div className="dashboard">
            {requestForm.map((eachUser, i) => {

                return (
                    <Grid key={i} marginRight='15%' marginLeft='2%'>
                        <TableContainer elevation={5}>
                            <Table>
                                <TableCell width='50%'>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Name:{eachUser.name} <br />
                                        Father Name:{eachUser.fatherName}<br />
                                        cnic:{eachUser.cnic}<br />
                                        DateOfBirth:{eachUser.DateOfBirth}<br />
                                        Family Member:{eachUser.fmember}<br />
                                        status:{eachUser.status}
                                    </Typography>
                                </TableCell>
                                {/* <TableCell width='15%'>
                                    <IconButton onClick={() => { del(eachUser.id) }}>
                                        <DeleteForeverIcon style={{ fontSize: 40, color: 'red' }} />
                                    </IconButton>
                                </TableCell> */}
                            </Table>
                        </TableContainer>
                    </Grid>
                )
            })}



        </div>
    )
}

export default Dashboard;