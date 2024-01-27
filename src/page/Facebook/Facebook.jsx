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
import {
  createFacebookLink,
  deleteFacebookLink,
  getFacebookLink,
} from "../../redux/APIs/facebookApiCall";
import EditModal from "./EditModal";
import swal from "sweetalert";

const Facebook = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));
  const [link, setLink] = useState("");
  const { facebook } = useSelector((state) => state.facebook);
  const [updateFacebook, setUpdateFacebook] = useState(false);

  useEffect(() => {
    dispatch(getFacebookLink());
  }, []);

  const onSubmit = () => {
    if (
      link.trim() === "" ||
      !link
        .trim()
        .match(
          /^(?:(?:http|https):\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile\.php\?id=(?=\d.*))?([\w\-]*)?$/
        )
    ) {
      return toast.error(`Invalid Link`, toastOptions);
    }

    dispatch(createFacebookLink({ link }, user.token));
  };

  // Delete Facebook Handler
  const deleteFacebooktHandler = (facebookId) => {
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
        dispatch(deleteFacebookLink(user.token, facebookId));
        swal("Account Has Been Deleted Successfully", {
          icon: "success",
        });
        window.location.reload();
      }
    });
  };

  return (
    <Box>
      <Header title="FACEBOOK LINK" subTitle="Manage your facebook link" />
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
              href={facebook[0]?.link}
              target="_blank"
              sx={{ padding: "0 20px" }}
            >
              {facebook[0]?.link ? facebook[0]?.link : "There is no link"}
            </Link>
          </Typography>
          <Stack direction={"row"}>
            <Button
              disabled={!facebook[0]?.link}
              variant="contained"
              color="error"
              endIcon={<DeleteIcon sx={{ marginTop: "-2px" }} />}
              sx={{ marginRight: "2px" }}
              onClick={() => deleteFacebooktHandler(facebook[0]._id)}
            >
              Delete Link
            </Button>
            <Button
              disabled={!facebook[0]?.link}
              variant="contained"
              color="warning"
              endIcon={<BorderColorIcon sx={{ marginTop: "-2px" }} />}
              sx={{ marginLeft: "2px" }}
              onClick={() => setUpdateFacebook(true)}
            >
              Edit Link
            </Button>
          </Stack>
        </Card>
        {!updateFacebook && (
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
                helperText="Must be valid facebook link"
                label="Facebook Link"
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
      {updateFacebook && (
        <EditModal
          facebookLink={facebook}
          setUpdateFacebook={setUpdateFacebook}
        />
      )}
    </Box>
  );
};

export default Facebook;
