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
import {
  createLinkedinLink,
  deleteLinkedinLink,
  getLinkedinLink,
} from "../../redux/APIs/linkedinApiCall";
import { useEffect } from "react";
import EditModal from "./EditModal";

function Linkedin() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));
  const [link, setLink] = useState("");
  const { linkedin } = useSelector((state) => state.linkedin);
  const [updateLinkedin, setUpdateLinkedin] = useState(false);

  useEffect(() => {
    dispatch(getLinkedinLink());
  }, []);

  const onSubmit = () => {
    if (
      link.trim() === "" ||
      !link
        .trim()
        .match(
          /^(?:(?:http|https):\/\/)?(?:www\.)?linkedin\.com\/(in\/)?[\w-]+\/?$/
        )
    ) {
      return toast.error(`Invalid Link`, toastOptions);
    }

    dispatch(createLinkedinLink({ link }, user.token));
  };

  // Delete Linkedin Handler
  const deleteLinkedintHandler = (linkedinId) => {
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
        dispatch(deleteLinkedinLink(user.token, linkedinId));
        swal("Account Has Been Deleted Successfully", {
          icon: "success",
        });
        window.location.reload();
      }
    });
  };

  return (
    <Box>
      <Header title="LINKEDIN LINK" subTitle="Manage your linkedin link" />
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
              href={linkedin[0]?.link}
              target="_blank"
              sx={{ padding: "0 20px" }}
            >
              {linkedin[0]?.link ? linkedin[0]?.link : "There is no link"}
            </Link>
          </Typography>
          <Stack direction={"row"}>
            <Button
              disabled={!linkedin[0]?.link}
              variant="contained"
              color="error"
              endIcon={<DeleteIcon sx={{ marginTop: "-2px" }} />}
              sx={{ marginRight: "2px" }}
              onClick={() => deleteLinkedintHandler(linkedin[0]._id)}
            >
              Delete Link
            </Button>
            <Button
              onClick={() => setUpdateLinkedin(true)}
              disabled={!linkedin[0]?.link}
              variant="contained"
              color="warning"
              endIcon={<BorderColorIcon sx={{ marginTop: "-2px" }} />}
              sx={{ marginLeft: "2px" }}
            >
              Edit Link
            </Button>
          </Stack>
        </Card>
        {!updateLinkedin && (
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
                value={link}
                onChange={(e) => setLink(e.target.value)}
                helperText="Must be valid linkedin link"
                label="Linkedin Link"
                variant="filled"
                sx={{ width: "350px" }}
              />

              <Box sx={{ textAlign: "left" }}>
                <Button
                  type="submit"
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
                >
                  Create New Link
                </Button>
              </Box>
            </Box>
          </Card>
        )}
      </Stack>
      {updateLinkedin && (
        <EditModal
          linkedinLink={linkedin}
          setUpdateLinkedin={setUpdateLinkedin}
        />
      )}
    </Box>
  );
}

export default Linkedin;
