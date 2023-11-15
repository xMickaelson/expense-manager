import { Card, CardContent, Grid, Typography } from "@mui/joy";

function Categories() {
  return (
    <Grid container paddingTop="1.5rem" spacing={2}>
      <Grid xs={12} sm={4} md={3}>
        <Card>
          <CardContent>
            <Typography>Category 1</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Categories;
