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
import { updateFacebookLink } from "../../redux/APIs/facebookApiCall";

const EditModal = ({ setUpdateFacebook, facebookLink }) => {
  const [link, setLink] = useState(facebookLink[0].link);
  const { handleSubmit } = useForm();
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  // Form Submit Handler
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

    dispatch(updateFacebookLink({ link }, user.token, facebookLink[0]._id));
    setUpdateFacebook(false);
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
            <Box onClick={() => setUpdateFacebook(false)}>
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
              value={link}
              onChange={(e) => setLink(e.target.value)}
              helperText="Must be valid facebook link"
              label="New Facebook Link"
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
