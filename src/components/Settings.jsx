import {
  Button,
  Card,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/APIs/authApiCall";

function Settings({ setOpenSettings, setMode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { user } = useSelector((state) => state.auth);

  const handleClickAway = () => {
    setOpenSettings(false);
  };

  const handleModeToggle = () => {
    const newMode = theme.palette.mode === "light" ? "dark" : "light";
    localStorage.setItem("currentMode", newMode);
    setMode(newMode);
  };

  const logoutUserHandler = () => {
    navigate("/login");
    setOpenSettings(false);
    dispatch(logoutUser());
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Card
        sx={{
          position: "absolute",
          top: "45px",
          right: "50px",
          padding: "15px",
          width: "190px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {!user && (
          <Button
            sx={{ textTransform: "capitalize" }}
            onClick={() => {
              navigate("/login");
            }}
            startIcon={<LoginIcon />}
          >
            Log in
          </Button>
        )}
        <Button
          onClick={logoutUserHandler}
          startIcon={<LogoutIcon />}
          sx={{ textTransform: "capitalize" }}
        >
          Logout
        </Button>

        <Divider />

        <IconButton style={{ backgroundColor: "transparent" }}>
          {theme.palette.mode === "light" ? (
            <>
              <Typography
                sx={{
                  marginRight: "10px",
                  marginLeft: "15px",
                  color: theme.palette.mode === "dark" ? "#90CAF9" : "#1976D2",
                  fontSize: "15px",
                }}
              >
                Theme
              </Typography>
              <FormGroup>
                <FormControlLabel
                  onClick={handleModeToggle}
                  control={<Switch size="small" />}
                />
              </FormGroup>
            </>
          ) : (
            <>
              <Typography
                sx={{
                  marginRight: "10px",
                  marginLeft: "15px",
                  color: theme.palette.mode === "dark" ? "#90CAF9" : "#1976D2",
                  fontSize: "15px",
                }}
              >
                Theme
              </Typography>
              <FormGroup>
                <FormControlLabel
                  onClick={handleModeToggle}
                  control={<Switch size="small" defaultChecked />}
                />
              </FormGroup>
            </>
          )}
        </IconButton>
      </Card>
    </ClickAwayListener>
  );
}

export default Settings;
