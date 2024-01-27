import { Box, Stack, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import TeamComponent from "../../components/TeamComponent";
import ServicesComponent from "../../components/ServicesComponent";
import Social from "../../components/Social";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFacebookLink } from "../../redux/APIs/facebookApiCall";
import { getLinkedinLink } from "../../redux/APIs/linkedinApiCall";
import { getGmail } from "../../redux/APIs/gmailApiCall";
import { getAllProducts } from "../../redux/APIs/productApiCall";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { facebook } = useSelector((state) => state.facebook);
  const { linkedin } = useSelector((state) => state.linkedin);
  const { gmail } = useSelector((state) => state.gmail);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getFacebookLink());
    dispatch(getLinkedinLink());
    dispatch(getGmail());
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header
          isDashboard={true}
          title={"DASHBOARD"}
          subTitle={"Welcome to our dashboard"}
        />
      </Stack>

      <Stack direction={"row"} justifyContent={"space-between"}>
        <TeamComponent />
        <ServicesComponent />
      </Stack>

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Social link={facebook[0]?.link} title="FACEBOOK" />
        <Social link={linkedin[0]?.link} title="LINKEDIN" />
        <Social link={gmail[0]?.email} title="GMAIL" />
      </Stack>

      <br />
      <Header title={"LATEST PRODUCTS"} subTitle={"Our Latest Work"} />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        marginTop={"20px"}
      >
        {products?.slice(-3)?.map((product) => (
          <img
            onClick={() => navigate("/products")}
            title={product?.title}
            width="32.5%"
            style={{ cursor: "pointer" }}
            src={product?.image?.url}
            alt={product?.title}
          />
        ))}
      </Stack>
    </div>
  );
};

export default Dashboard;
