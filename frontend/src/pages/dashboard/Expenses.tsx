import { PlusIcon } from "@heroicons/react/20/solid";
import {
  Accordion,
  AccordionGroup,
  AccordionSummary,
  Button,
  ButtonGroup,
  Card,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";

function Expenses() {
  return (
    <Grid container paddingTop="1.5rem" spacing={2}>
      <Grid xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ButtonGroup>
            <Button>Daily</Button>
            <Button>Weekly</Button>
            <Button>Monthly</Button>
          </ButtonGroup>
          <Typography level="title-lg" color="neutral">
            {new Date().toDateString()}
          </Typography>
          <Button startDecorator={<PlusIcon height={20}/>}>Add a Expense</Button>
        </Stack>
      </Grid>
      <Grid xs={4}>
        <Card>
          <Typography level="body-md" color="neutral">
            Income
          </Typography>
          <Typography level="h2">$900</Typography>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card>
          <Typography level="body-md" color="neutral">
            Expenses
          </Typography>
          <Typography level="h2">$900</Typography>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card>
          <Typography level="body-md" color="neutral">
            Total
          </Typography>
          <Typography level="h2">$900</Typography>
        </Card>
      </Grid>
      <Grid xs={12}>
        <AccordionGroup variant="outlined" sx={{ borderRadius: "md" }}>
          {[1, 2, 3, 4, 5, 6].map(() => (
            <Accordion>
              <AccordionSummary>Expense 1</AccordionSummary>
            </Accordion>
          ))}
        </AccordionGroup>
      </Grid>
    </Grid>
  );
}

export default Expenses;
