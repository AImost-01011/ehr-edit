import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookie from "js-cookie";

import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { RootState } from "../../../../redux/store";
import Button from "@material-ui/core/Button";
import { closeCreateDia } from "../../../../redux/supporterSlice";
import { Box, Typography } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { setNavListSave } from "../../../../redux/oneStaffSlice";

const CreateDialog: React.FC = () => {
  //data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstHira, setFirstHira] = useState("");
  const [lastHira, setLastHira] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(new Date());
  const [gender, setGender] = useState("");
  const [zip_p, setZip_p] = useState("");
  const [address1_p, setAddress1_p] = useState("");
  const [address2_p, setAddress2_p] = useState("");

  const [isLoading, setIsLoading] = useState("hidden");

  const supportSelector = useSelector((state: RootState) => state.supporter);
  const staffSelector = useSelector((state: RootState) => state.oneStaff);
  const dispatch = useDispatch();

  const backClick = () => {
    if (isLoading === "hidden") dispatch(closeCreateDia());
  };

  const createClick = () => {
    if (firstName && lastName && firstHira && lastHira) {
      setIsLoading("visible");
      const oriId_m = Cookie.get("miId");

      axios
        .post("/api/patient/create", {
          oriId_m: oriId_m,
          oriId_s: staffSelector.oriId_s,
          patientName: `${lastName} ${firstName}`,
          patientHira: `${lastHira} ${firstHira}`,
          gender: gender,
          birthday: birthday.getTime(),
          zip_p: zip_p,
          address1_p: address1_p,
          address2_p: address2_p,
        })
        .then((result) => {
          dispatch(
            setNavListSave({
              oriId_s: staffSelector.oriId_s,
              navListSave: [...staffSelector.navListSave, result.data],
            })
          );
          dispatch(closeCreateDia());
          setIsLoading("hidden");
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("????????????????????????????????????????????????????????????????????????????????????");
    }
  };

  const inputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    switch (e.currentTarget.id) {
      case "lastName":
        setLastName(e.target.value);
        break;

      case "firstName":
        setFirstName(e.target.value);
        break;

      case "lastHira":
        setLastHira(e.target.value);
        break;

      case "firstHira":
        setFirstHira(e.target.value);
        break;

      case "zip":
        setZip_p(e.target.value);
        break;

      case "add1":
        setAddress1_p(e.target.value);
        break;

      case "add2":
        setAddress2_p(e.target.value);
        break;

      default:
        break;
    }
  };

  const genderChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void = (e) => {
    switch (e.target.value) {
      case "male":
        setGender("??????");
        break;

      case "female":
        setGender("??????");
        break;

      default:
        setGender(e.target.value);
        break;
    }
  };

  return (
    <Dialog open={supportSelector.isCreateOpen} fullWidth maxWidth="lg">
      <DialogTitle>??????????????????????????????</DialogTitle>

      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="right">???????????????</TableCell>
                <TableCell>
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                  >
                    <Box width="40%">
                      <TextField
                        size="small"
                        label="??????"
                        id="lastName"
                        onChange={inputChange}
                        fullWidth
                      />
                    </Box>
                    <Box width="40%">
                      <TextField
                        size="small"
                        label="??????"
                        id="firstName"
                        onChange={inputChange}
                        fullWidth
                      />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">????????????????????????(????????????)</TableCell>
                <TableCell>
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                  >
                    <Box width="40%">
                      <TextField
                        size="small"
                        label="????????????(????????????)"
                        helperText="?????????????????????????????????????????????????????????"
                        id="lastHira"
                        onChange={inputChange}
                        fullWidth
                      />
                    </Box>
                    <Box width="40%">
                      <TextField
                        size="small"
                        label="?????????(????????????)"
                        helperText="?????????????????????????????????????????????????????????"
                        id="firstHira"
                        onChange={inputChange}
                        fullWidth
                      />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">????????????</TableCell>
                <TableCell align="center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      disableFuture
                      //   disableToolbar
                      size="small"
                      openTo="year"
                      format="yyyy/MM/dd"
                      views={["year", "month", "date"]}
                      maxDate={new Date()}
                      variant="dialog"
                      value={birthday}
                      onChange={setBirthday}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">??????</TableCell>
                <TableCell align="center">
                  <FormControl>
                    <RadioGroup onChange={genderChange} row>
                      <FormControlLabel
                        value="male"
                        control={<Radio color="primary" size="small" />}
                        label="??????"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio color="primary" size="small" />}
                        label="??????"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio color="primary" size="small" />}
                        label="
                         ?????????
                        "
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">???????????????</TableCell>
                <TableCell>
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Box width="90%">
                      <TextField
                        fullWidth
                        label="????????????"
                        helperText="??????000-0000"
                        size="small"
                        id="zip"
                        onChange={inputChange}
                      />
                    </Box>
                    <Box width="90%">
                      <TextField
                        fullWidth
                        label="????????????????????????????????????"
                        helperText="?????????????????????????????????????????????????????????????????????????????????-???"
                        size="small"
                        id="add1"
                        onChange={inputChange}
                      />
                    </Box>
                    <Box width="90%">
                      <TextField
                        fullWidth
                        label="?????????????????????????????????"
                        helperText="???????????????????????????"
                        size="small"
                        id="add2"
                        onChange={inputChange}
                      />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <Box
          width="260px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mx="10px"
          visibility={isLoading}
        >
          <CircularProgress size={30} />
          <Typography variant="body1" color="primary">
            ???????????????????????????????????????
          </Typography>
        </Box>
        <Button color="primary" variant="outlined" onClick={backClick}>
          ?????????
        </Button>
        <Button color="primary" variant="contained" onClick={createClick}>
          ??????
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialog;
