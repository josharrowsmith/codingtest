import React, { useEffect, useState } from "react";
import { Button, Container, Box } from "../../components";
import { useQuery, useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { getShifts, createShifts, deleteShift } from "../../utils/shifts"
import { getAllUsers } from "../../utils/users"
import { getOrg } from "../../utils/organisations"
import { useAuth } from "../../hooks";
import Table from "../../components/Table/Table"
import moment from "moment"
import MomentInput from 'react-moment-input';

const initialState = [{
    "name": "",
    "shift Date": "",
    "start": "",
    "finish": "",
    "hours worked": "",
    "shift cost": ""
}]


export default function OrgShifts(props) {
    const { user, token } = useAuth();
    const history = useHistory();
    const id = props.location.state;
    const mutation = useMutation(createShifts)
    const [tdata, setTdata] = useState([])
    const [data, setdata] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [linkUser, setlinkUser] = useState(new Map)
    const [org, setorg] = useState({})
    const [shiftDate, setDate] = useState(new Date())
    const [start, setStart] = useState(new Date())
    const [finish, setFinish] = useState(new Date(Date.now() + 1000 * 60 * 60 * 8))
    const [reload, setReload] = useState(false);
    const [me, setMe] = useState()

    function makeDateTable() {
        const newlinkUser = linkUser;
        for (let i = 0; i < allUsers.length; i++) {
            newlinkUser.set(allUsers[i].id, allUsers[i].name);
        }

        setlinkUser(newlinkUser)
        const result = data.map((shift, i) => {
            return (
                ({
                    name: linkUser.get(shift.userId),
                    "shift date": moment(shift.start).format("DD/MM/YYYY"),
                    start: moment(shift.start).format("h:mm"),
                    finish: moment(shift.finish).format("h:mm"),
                    "Hours worked": moment(shift.finish).diff(moment(shift.start), 'hours'),
                    "shifts cost": (moment(shift.finish).diff(moment(shift.start), 'hours') * parseInt(org.hourlyRate))
                })
            )
        })
        setTdata(result)
        setReload(false)
    }

    async function getTheShifts() {
        const result = await getShifts(token)
        setdata(result)
    }

    async function getAllTheUsers() {
        const result = await getAllUsers(token)
        setAllUsers(result)
    }

    async function getOrgName() {
        const result = await getOrg(token, id)
        setorg(result)
    }

    useEffect(() => {
        if (data && data.length && allUsers && allUsers.length) {
            makeDateTable()
        }
    }, [data, allUsers]);

    useEffect(() => {
        getTheShifts()
        getAllTheUsers()
        getOrgName()
    }, []);


    // sketchy will fix later
    useEffect(() => {
        if (reload) {
            getTheShifts()
        }
    }, [reload]);

    async function createShift() {
        const result = await mutation.mutateAsync({
            token,
            userId: user.id,
            shiftDate,
            start,
            finish
        });
        if (result == 200) {
            setReload(true)
        }
    }

    return (
        <Container>
            <Box>
                <h2>Logged in as : {user.name}</h2>
                <h2>{org.name}: ${org.hourlyRate} per hour</h2>
                {tdata && tdata.length ? (
                    <Table data={tdata}>
                        <Table.TR>
                            <Table.TD>{user.name}</Table.TD>
                            <Table.TD>
                                <MomentInput
                                    max={moment()}
                                    min={moment()}
                                    defaultValue={moment()}
                                    format="DD-MM-YY"
                                    readOnly={false}
                                    enableInputClick
                                    onChange={(value) => setDate(value)}
                                />
                            </Table.TD>
                            <Table.TD>
                                <MomentInput
                                    max={moment()}
                                    min={moment()}
                                    defaultValue={moment()}
                                    format="HH:mm"
                                    readOnly={false}
                                    enableInputClick
                                    onChange={(value) => setStart(value)}
                                />
                            </Table.TD>
                            <Table.TD>
                                <MomentInput
                                    max={moment()}
                                    min={moment()}
                                    defaultValue={moment().add(8, 'hours')}
                                    format="HH:mm"
                                    readOnly={false}
                                    enableInputClick
                                    onChange={(value) => setFinish(value)}
                                />
                            </Table.TD>
                            <Table.TD><Button onClick={createShift}>create</Button></Table.TD>
                        </Table.TR>
                    </Table>
                ) : (
                    <Table data={initialState}>
                        <Table.TR>
                            <Table.TD>{user.name}</Table.TD>
                            <Table.TD>
                                <MomentInput
                                    max={moment()}
                                    min={moment()}
                                    defaultValue={moment()}
                                    format="DD-MM-YY"
                                    readOnly={false}
                                    enableInputClick
                                    onChange={(value) => setDate(value)}
                                />
                            </Table.TD>
                            <Table.TD>
                                <MomentInput
                                    max={moment()}
                                    min={moment()}
                                    defaultValue={moment()}
                                    format="HH:mm"
                                    readOnly={false}
                                    enableInputClick
                                    onChange={(value) => setStart(value)}
                                />
                            </Table.TD>
                            <Table.TD>
                                <MomentInput
                                    max={moment()}
                                    min={moment()}
                                    defaultValue={moment().add(8, 'hours')}
                                    format="HH:mm"
                                    readOnly={false}
                                    enableInputClick
                                    onChange={(value) => setDate(value)}
                                />
                            </Table.TD>
                            <Table.TD><Button onClick={createShift}>create</Button></Table.TD>
                        </Table.TR>
                    </Table>
                )}
            </Box>
        </Container>
    );
}

