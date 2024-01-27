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
import { updateWhatsapp } from "../../redux/APIs/whatsappApiCall";

const EditModal = ({ setUpdateWhatsapp, whatsapp }) => {
  const [number, setNumber] = useState(whatsapp[0].number);
  const { handleSubmit } = useForm();
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  // Form Submit Handler
  const onSubmit = () => {
    if (
      number.trim() === "" ||
      !number
        .trim()
        .match(
          /^(\+\d{1,3}\s?)?(\(\d{1,3}\)\s?)?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/
        )
    ) {
      return toast.error(`Invalid Number`, toastOptions);
    }

    dispatch(updateWhatsapp({ number }, user.token, whatsapp[0]._id));
    setUpdateWhatsapp(false);
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
            <Box onClick={() => setUpdateWhatsapp(false)}>
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
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              helperText="Must be valid whatsapp number"
              label="New Whatsapp Number"
              variant="filled"
              sx={{ width: "350px" }}
            />

            <Box sx={{ textAlign: "left" }}>
              <Button
                type="submit"
                sx={{ textTransform: "capitalize" }}
                variant="contained"
              >
                Update Link
              </Button>
            </Box>
          </Box>
        </Card>
      </Stack>
    </>
  );
};

export default EditModal;
