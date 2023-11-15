import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/joy";

function Budgets() {
  return (
    <Grid container paddingTop={"1.5rem"} spacing={2}>
      <Grid xs={12} sm={4} lg={3}>
        <Card>
          <CardContent>
            <Typography>Category 1</Typography>
          </CardContent>
          <CardActions>
            <Button>Set Budget</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid xs={12} sm={4} lg={3}>
        <Card>
          <CardContent>
            <Typography>Category 2</Typography>
            <Typography level="h2">$900/1200</Typography>
            <Box>
              <LinearProgress determinate value={60} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Budgets;
