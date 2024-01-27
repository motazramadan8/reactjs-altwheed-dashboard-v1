import React from "react";
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
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toastOptions from "../../toastOpt";
import { toast } from "react-toastify";
import { useEffect } from "react";
import EditModal from "./EditModal";
import {
  createWhatsapp,
  deleteWhatsapp,
  getWhatsapp,
} from "../../redux/APIs/whatsappApiCall";

function Whatsapp() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));
  const [number, setNumber] = useState("");
  const { whatsapp } = useSelector((state) => state.whatsapp);
  const [updateWhatsapp, setUpdateWhatsapp] = useState(false);

  useEffect(() => {
    dispatch(getWhatsapp());
  }, []);

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

    dispatch(createWhatsapp({ number }, user.token));
  };

  // Delete Facebook Handler
  const deleteLinkedintHandler = (whatsappId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this link",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteWhatsapp(user.token, whatsappId));
        swal("Account Has Been Deleted Successfully", {
          icon: "success",
        });
        window.location.reload();
      }
    });
  };

  return (
    <Box>
      <Header title="WHATSAPP NUMBER" subTitle="Manage your whatsapp number" />
      <Stack justifyContent={"space-between"} alignItems={"center"}>
        <Card
          sx={{
            width: { lg: "50%", md: "80%", sm: "100%" },
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography paragraph fontSize={"20px"} textAlign={"center"}>
            <Link
              href={`http://wa.me/${whatsapp[0]?.number}`}
              target="_blank"
              sx={{ padding: "0 20px" }}
            >
              {whatsapp[0]?.number
                ? whatsapp[0]?.number
                : "There is no number available"}
            </Link>
          </Typography>
          <Stack direction={"row"}>
            <Button
              disabled={!whatsapp[0]?.number}
              variant="contained"
              color="error"
              endIcon={<DeleteIcon sx={{ marginTop: "-2px" }} />}
              sx={{ marginRight: "2px" }}
              onClick={() => deleteLinkedintHandler(whatsapp[0]._id)}
            >
              Delete Number
            </Button>
            <Button
              onClick={() => setUpdateWhatsapp(true)}
              disabled={!whatsapp[0]?.number}
              variant="contained"
              color="warning"
              endIcon={<BorderColorIcon sx={{ marginTop: "-2px" }} />}
              sx={{ marginLeft: "2px" }}
            >
              Edit Number
            </Button>
          </Stack>
        </Card>
        {!updateWhatsapp && (
          <Card
            sx={{
              marginTop: "20px",
              width: { lg: "50%", md: "80%", sm: "100%", xs: "100%" },
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
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
              <TextField
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                helperText="Must be valid whatsapp number"
                label="Whatsapp Number"
                variant="filled"
                sx={{ width: "350px" }}
              />

              <Box sx={{ textAlign: "left" }}>
                <Button
                  type="submit"
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
                >
                  Create New Number
                </Button>
              </Box>
            </Box>
          </Card>
        )}
      </Stack>
      {updateWhatsapp && (
        <EditModal whatsapp={whatsapp} setUpdateWhatsapp={setUpdateWhatsapp} />
      )}
    </Box>
  );
}

export default Whatsapp;
