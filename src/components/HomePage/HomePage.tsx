import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  Snackbar,
  Theme,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { createStyles, makeStyles } from '@material-ui/styles';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import MailIcon from '@material-ui/icons/Mail';
import './HomePage.scss';
import EventCard from '../EventCard/EventCard';
// import { EventCard } from 'components/EventCard/EventCard';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      minWidth: 275,
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
});

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const HomePage = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className="body">
      <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => {}} severity="success" elevation={6} variant="filled">
          This is a success message!
        </Alert>
      </Snackbar>

      <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={() => {}} severity="warning" elevation={6} variant="filled">
          This is a warning message!
        </Alert>
      </Snackbar>
      <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => {}} severity="error" elevation={6} variant="filled">
          This is an error message!
        </Alert>
      </Snackbar>

      <div className={classes.root}>
        <Button color="default" variant="contained">
          default
        </Button>
        <Button color="primary" variant="contained">
          primary
        </Button>
        <Button color="secondary" variant="contained">
          secondary
        </Button>
      </div>

      <div className={classes.root}>
        <Button color="default" variant="outlined">
          default
        </Button>
        <Button color="primary" variant="outlined">
          primary
        </Button>
        <Button color="secondary" variant="outlined">
          secondary
        </Button>
      </div>

      <div className={classes.root}>
        <Badge badgeContent={4} color="primary">
          <MailIcon />
        </Badge>
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
        <Badge badgeContent={4} color="default">
          <MailIcon />
        </Badge>
      </div>

      <div className={classes.root}>
        <HomeIcon />
        <HomeIcon color="primary" />
        <HomeIcon color="secondary" />
        <HomeIcon color="action" />
        <HomeIcon color="disabled" />
      </div>

      <div className={classes.root}>
        <Checkbox
          defaultChecked
          value="secondary"
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <Checkbox value="uncontrolled" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
        <Checkbox
          defaultChecked
          value="indeterminate"
          indeterminate
          inputProps={{ 'aria-label': 'indeterminate checkbox' }}
        />
        <Checkbox
          defaultChecked
          color="default"
          value="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
        <Checkbox
          defaultChecked
          size="small"
          value="small"
          inputProps={{ 'aria-label': 'checkbox with small size' }}
        />
      </div>

      <div className={classes.root}>
        <CircularProgress />
        <CircularProgress color="secondary" />
      </div>

      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <EventCard></EventCard>
    </div>
  );
};

export default HomePage;
