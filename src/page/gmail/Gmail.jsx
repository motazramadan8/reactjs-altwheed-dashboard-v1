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
import swal from "sweetalert";
import {
  createGmail,
  deleteGmail,
  getGmail,
} from "../../redux/APIs/gmailApiCall";

const Gmail = () => {
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState("");
  const { gmail } = useSelector((state) => state.gmail);
  const [updateGmail, setUpdateGmail] = useState(false);

  useEffect(() => {
    dispatch(getGmail());
  }, []);

  const onSubmit = () => {
    if (
      email.trim() === "" ||
      !email.trim().match(/(https?)?:?(\/\/)?(www.)?\w+\.\w+:?.+/gi)
    ) {
      return toast.error(`Invalid Link`, toastOptions);
    }

    dispatch(createGmail({ email }, user.token));
  };

  // Delete Gmail Handler
  const deleteGmailHandler = (gmailId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this email",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteGmail(user.token, gmailId));
        swal("Email Has Been Deleted Successfully", {
          icon: "success",
        });
        window.location.reload();
      }
    });
  };

  return (
    <Box>
      <Header title="GMAIL" subTitle="Manage your gmail" />
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
              href={gmail[0]?.email}
              target="_blank"
              sx={{ padding: "0 20px" }}
            >
              {gmail[0]?.email ? gmail[0]?.email : "There is no email"}
            </Link>
          </Typography>
          <Stack direction={"row"}>
            <Button
              disabled={!gmail[0]?.email}
              variant="contained"
              color="error"
              endIcon={<DeleteIcon sx={{ marginTop: "-2px" }} />}
              sx={{ marginRight: "2px" }}
              onClick={() => deleteGmailHandler(gmail[0]._id)}
            >
              Delete Link
            </Button>
            <Button
              disabled={!gmail[0]?.email}
              variant="contained"
              color="warning"
              endIcon={<BorderColorIcon sx={{ marginTop: "-2px" }} />}
              sx={{ marginLeft: "2px" }}
              onClick={() => setUpdateGmail(true)}
            >
              Edit Link
            </Button>
          </Stack>
        </Card>
        {!updateGmail && (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText="Must be valid gmail"
                label="Email"
                variant="filled"
                sx={{ width: "350px" }}
              />

              <Box sx={{ textAlign: "left" }}>
                <Button
                  type="submit"
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
                >
                  Create New Gmail
                </Button>
              </Box>
            </Box>
          </Card>
        )}
      </Stack>
      {updateGmail && (
        <EditModal gmailLink={gmail} setUpdateGmail={setUpdateGmail} />
      )}
    </Box>
  );
};

export default Gmail;
