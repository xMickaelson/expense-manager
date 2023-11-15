import {
  CurrencyRupeeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";

function Accounts() {
  return (
    <Grid container paddingTop="1.5rem" spacing={2}>
      <Grid xs={12}>
        <Card>
          <CardContent>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Box>
                <Typography level="title-md" color="neutral">
                  Available Balance
                </Typography>
                <Typography level="h2">$12,000</Typography>
              </Box>
              <Button startDecorator={<PlusIcon height={20}/>}>Add Account</Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={4} md={3}>
        <Card variant="solid" color="primary" invertedColors>
          <CardContent>
            <Typography
              level="title-sm"
              startDecorator={<CurrencyRupeeIcon height={20} />}
            >
              Account Name
            </Typography>
            <Typography level="h3" paddingY="1rem">
              $ 52,000
            </Typography>
          </CardContent>
          <CardActions orientation="horizontal-reverse">
            <IconButton variant="soft" size="sm">
              <PencilIcon height={16} />
            </IconButton>
            <IconButton variant="soft" size="sm">
              <TrashIcon height={16} />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Accounts;
