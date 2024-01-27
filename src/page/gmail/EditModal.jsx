import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import toastOptions from "../../toastOpt";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { updateGmail } from "../../redux/APIs/gmailApiCall";

const EditModal = ({ setUpdateGmail, gmailLink }) => {
  const [email, setEmail] = useState(gmailLink[0].email);
  const { handleSubmit } = useForm();
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  // Form Submit Handler
  const onSubmit = () => {
    if (
      email.trim() === "" ||
      !email.trim().match(/(https?)?:?(\/\/)?(www.)?\w+\.\w+:?.+/gi)
    ) {
      return toast.error(`Invalid Email`, toastOptions);
    }

    dispatch(updateGmail({ email }, user.token, gmailLink[0]._id));
    setUpdateGmail(false);
  };

  return (
    <>
      <Stack justifyContent={"space-between"} alignItems={"center"}>
        <Card
          sx={{
            marginTop: "20px",
            width: { lg: "50%", md: "80%", sm: "100%", xs: "100%" },
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              height: "500px",
              alignItems: "center",
              justifyContent: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <Box onClick={() => setUpdateGmail(false)}>
              <CancelIcon
                sx={{
                  textAlign: "right",
                  cursor: "pointer",
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  width: "30px",
                  height: "30px",
                }}
                color="error"
              />
            </Box>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="Must be valid email"
              label="New Email"
              variant="filled"
              sx={{ width: "350px" }}
            />

            <Box sx={{ textAlign: "left" }}>
              <Button
                type="submit"
                sx={{ textTransform: "capitalize" }}
                variant="contained"
              >
                Update Email
              </Button>
            </Box>
          </Box>
        </Card>
      </Stack>
    </>
  );
};

export default EditModal;
