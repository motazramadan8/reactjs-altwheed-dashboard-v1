import { Box, Card, Link, Typography } from "@mui/material";
import Header from "./Header";
import { useTheme } from "@emotion/react";

function Social({ link, title }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: "32.5%",
        marginTop: "20px",
        padding: "15px",
      }}
    >
      <Box>
        <Typography
          sx={{
            color: theme.palette.info.light,
            fontWeight: "bold",
            marginBottom: "10px",
          }}
          variant="h5"
        >
          {title}
        </Typography>
      </Box>

      <Link sx={{ fontSize: "15px" }} target="_blank" href={link?.includes("gmail") ? `mailto:${link}` : link}>
        {link}
      </Link>
    </Card>
  );
}

export default Social;
