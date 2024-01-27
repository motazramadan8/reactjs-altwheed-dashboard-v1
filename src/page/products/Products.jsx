import { useEffect, useState } from "react";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { deleteProduct, getAllProducts } from "../../redux/APIs/productApiCall";
import swal from "sweetalert";

const Services = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(false);

  setTimeout(() => {
    setProduct(true);
  }, 1500);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  // Delete User Handler
  const deleteUserHandler = (productId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then((isOk) => {
      if (isOk) {
        // dispatch(deleteWhatsapp(user.token, whatsappId));
        dispatch(deleteProduct(productId, user.token));
        swal("Service Has Been Deleted Successfully", {
          icon: "success",
        });
      }
    });
  };

  return (
    <Box>
      <Header title="PRODUCTS" subTitle="Managing your products" />
      <Box sx={{ height: 650, width: "99%", mx: "auto" }}>
        <Stack direction={{ xs: "column", sm: "row" }}>
          {products.length > 0 ? (
            <ImageList sx={{ width: "90%", height: 650, marginTop: "-1px" }}>
              {products?.map((item) => (
                <>
                  {product ? (
                    <ImageListItem key={item.img} sx={{ marginBottom: "20px" }}>
                      <img
                        srcSet={`${item.image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.image.url}?w=248&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                      />
                      <Stack direction={"row"} justifyContent={"space-around"}>
                        <ImageListItemBar
                          sx={{ marginTop: "20px" }}
                          title={item.title}
                          subtitle={<span>Category: {item.category}</span>}
                          position="below"
                        />
                        <Button
                          variant="contained"
                          sx={{ marginTop: "30px", marginBottom: "20px" }}
                          color="error"
                          onClick={() => deleteUserHandler(item?._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </ImageListItem>
                  ) : (
                    <Stack>
                      <Skeleton variant="rounded" width="100%" height="400px" />
                      <Skeleton width="80%" />
                      <Skeleton width="50%" />
                      <br />
                    </Stack>
                  )}
                </>
              ))}
            </ImageList>
          ) : (
            <Box>
              <Typography align="center" variant="h5">
                There is no products
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
export default Services;
