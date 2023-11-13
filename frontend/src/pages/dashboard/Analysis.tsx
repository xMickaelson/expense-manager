import { Card, CardContent, Grid } from "@mui/joy";
import { LineChart, PieChart } from "@mui/x-charts";

function Analysis() {
  return (
    <Grid container paddingTop="1.5rem" spacing={2}>
      <Grid xs={12}>
        <Card>
          <CardContent>
            <PieChart
              height={200}
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                  ],
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 1,
                  cornerRadius: 3,
                  startAngle: -90,
                  endAngle: 180,
                },
              ]}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12}>
        <Card>
          <CardContent>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              height={400}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Analysis;
