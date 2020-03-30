import React, { useState, useEffect, Fragment } from 'react';
import {
  Grid,
  Paper,
  List,
  ListItem,
  Checkbox,
  TextField,
  Typography,
  Slider,
  Fab,
  Dialog,
  Badge,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBoxOutlined';
import FilterListIcon from '@material-ui/icons/FilterListOutlined';
import moment from 'moment-timezone';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { useDispatch, useSelector } from 'react-redux';
import { HOMEPAGE } from 'redux/models/AppStateModel';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  EventModel,
  EVENT_STATUS_LABELS,
  USER_EVENT_STATUS_LABELS,
  getEventStatus,
  getUserEventStatus,
  UserEventModel,
} from 'redux/models/EventModel';
import { ReduxState } from 'redux/combinedReducer';
import { setSearching } from 'redux/actions/AppStateActions';
import EventCard from '../EventCard/EventCard';
import { eventGridStyles } from './EventGrid.styles';
import { isSmallDown } from 'lib/useBreakPoints';

const EVENT_TIME_FORMAT = 'MMMM Do, YYYY';

const EventGrid = () => {
  const classes = eventGridStyles();
  const isSmDown = isSmallDown();
  const dispatch = useDispatch();

  const allEventCategories = useSelector((state: ReduxState) => {
    return state.appState.categoriesArray;
  });

  const isHomepage = useSelector((state: ReduxState) => {
    return state.appState.route === HOMEPAGE;
  });

  const eventsMap = useSelector((state: ReduxState) => {
    return !isHomepage ? state.events.userEvents : state.events.events;
  });

  const search = useSelector((state: ReduxState) => {
    return state.appState.searchTerm;
  });

  const searching = useSelector((state: ReduxState) => {
    return state.appState.searching;
  });

  const [filterDialog, setFilterDialog] = useState(false);

  const [maxFee, setMaxFee] = useState(0);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [eventStatus, setEventStatus] = useState<string[]>([]);
  const [userEventStatus, setUserEventStatus] = useState<string[]>([]);

  const [filteredEvents, setFilteredEvents] = useState<EventModel[]>([]);

  function changePriceRange(event: any, newValue: number | number[]) {
    setPriceRange(newValue as number[]);
  }

  function closeFilterDialog() {
    setFilterDialog(false);
  }

  function getMarks() {
    const marks = [
      { value: 0, label: '$0' },
      { value: maxFee > 0 ? maxFee : 1, label: maxFee > 0 ? `$${maxFee}` : '$1' },
    ];

    const min = priceRange[0];
    const max = priceRange[1];

    if (min !== 0 && min !== maxFee && min !== 1) {
      marks.push({ value: min, label: `$${min}` });
    }

    if (max !== 0 && max !== maxFee && min !== max && max !== 1) {
      marks.push({ value: max, label: `$${max}` });
    }

    return marks;
  }

  useEffect(() => {
    let max = eventsMap
      .getAllData()
      .map((event) => {
        return event.fee;
      })
      .reduce((prev: number, current: number) => {
        return current > prev ? current : prev;
      }, 0);

    max = Math.ceil(max);
    setMaxFee(max);
    setPriceRange([0, max]);
  }, [eventsMap]);

  useEffect(() => {
    if (!isSmDown) {
      closeFilterDialog();
    }
  }, [isSmDown]);

  useEffect(() => {
    let filtered = eventsMap.getAllData().filter((event) => {
      return event.name.toUpperCase().includes(search.toUpperCase());
    });

    if (isHomepage) {
      filtered = filtered.filter((event) => {
        return event.end >= moment().valueOf();
      });
    }

    if (searching) {
      filtered = filtered.filter((event) => {
        return event.fee >= priceRange[0] && event.fee <= priceRange[1];
      });

      if (selectedDate) {
        filtered = filtered.filter((event) => {
          return (
            moment(event.start)
              .startOf('day')
              .valueOf() ===
            moment(selectedDate)
              .startOf('day')
              .valueOf()
          );
        });
      }

      if (categories.length > 0) {
        filtered = filtered.filter((event) => {
          return event.category.some((category) => {
            return categories.includes(category);
          });
        });
      }

      if (eventStatus.length > 0) {
        const evStatus = eventStatus.map((ev) => {
          return getEventStatus(ev);
        });

        filtered = filtered.filter((event) => {
          return evStatus.includes(event.status);
        });
      }

      if (userEventStatus.length > 0 && !isHomepage) {
        const usEvStatus = userEventStatus.map((ev) => {
          return getUserEventStatus(ev);
        });

        filtered = filtered.filter((event) => {
          return usEvStatus.includes((event as UserEventModel).eventUserStatus);
        });
      }
    }

    filtered = filtered.sort((a, b) => {
      return a.start - b.start;
    });

    setFilteredEvents(filtered);
  }, [
    eventsMap,
    search,
    searching,
    priceRange,
    selectedDate,
    categories,
    eventStatus,
    userEventStatus,
    isHomepage,
  ]);

  const showSideBarClose = !isSmDown && isHomepage;
  const showSideBar = !isSmDown && (searching || !isHomepage);

  const filterCompo = (
    <Paper className={classes.drawer} elevation={10} variant="elevation">
      <List>
        {showSideBarClose ? (
          <ListItem className={classes.listItemClose}>
            <IconButton
              color="secondary"
              size="small"
              onClick={() => {
                dispatch(setSearching(false));
              }}
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
        ) : null}

        <ListItem>
          <Typography className={classes.title} variant="body1">
            {isHomepage ? 'public events' : 'manage events'}
          </Typography>
        </ListItem>
        <ListItem className={classes.priceRange}>
          <Typography className={classes.priceRangeTitle} variant="body2">
            price
          </Typography>
          <Slider
            className={classes.slider}
            color="secondary"
            min={0}
            max={maxFee}
            step={1}
            marks={getMarks()}
            valueLabelDisplay="auto"
            value={priceRange}
            onChange={changePriceRange}
            valueLabelFormat={(val) => {
              return `$${val}`;
            }}
          />
        </ListItem>
        <ListItem>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk={true}
              clearable={true}
              className={classes.width100}
              label="Date"
              inputVariant="outlined"
              format={EVENT_TIME_FORMAT}
              value={selectedDate ? moment(selectedDate) : null}
              onChange={(date) => {
                setSelectedDate(date ? date.valueOf() : null);
              }}
            />
          </MuiPickersUtilsProvider>
        </ListItem>
        <ListItem>
          <Autocomplete
            className={classes.width100}
            multiple={true}
            disableCloseOnSelect={true}
            value={categories}
            options={allEventCategories}
            renderOption={(option, { selected }) => {
              return (
                <Fragment>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" color="secondary" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" color="secondary" />}
                    checked={selected}
                  />
                  {option}
                </Fragment>
              );
            }}
            renderInput={(params) => {
              return <TextField {...params} variant="outlined" label="Categories" />;
            }}
            onChange={(event, value) => {
              setCategories(value);
            }}
          />
        </ListItem>
        <ListItem>
          <Autocomplete
            className={classes.width100}
            multiple={true}
            value={eventStatus}
            options={EVENT_STATUS_LABELS}
            renderOption={(option, { selected }) => {
              return (
                <Fragment>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" color="secondary" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" color="secondary" />}
                    checked={selected}
                  />
                  {option}
                </Fragment>
              );
            }}
            renderInput={(params) => {
              return <TextField {...params} variant="outlined" label="Event Status" />;
            }}
            onChange={(event, value) => {
              setEventStatus(value);
            }}
          />
        </ListItem>
        {!isHomepage ? (
          <ListItem>
            <Autocomplete
              className={classes.width100}
              multiple={true}
              value={userEventStatus}
              options={USER_EVENT_STATUS_LABELS}
              renderOption={(option, { selected }) => {
                return (
                  <Fragment>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" color="secondary" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" color="secondary" />}
                      checked={selected}
                    />
                    {option}
                  </Fragment>
                );
              }}
              renderInput={(params) => {
                return <TextField {...params} variant="outlined" label="RSVP Status" />;
              }}
              onChange={(event, value) => {
                setUserEventStatus(value);
              }}
            />
          </ListItem>
        ) : null}
      </List>
    </Paper>
  );

  return (
    <Grid container={true} className={classes.container}>
      <Dialog
        open={filterDialog}
        onClose={closeFilterDialog}
        fullWidth={true}
        disableBackdropClick={true}
        disableEscapeKeyDown={false}
      >
        {filterCompo}
        <IconButton
          className={classes.closeButton}
          color="secondary"
          size="medium"
          onClick={closeFilterDialog}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>

      {showSideBar ? (
        <Grid container={true} item={true} sm={3} className={classes.drawerContainer}>
          {filterCompo}
        </Grid>
      ) : null}

      <Grid
        container={true}
        item={true}
        sm={showSideBar ? 9 : 12}
        spacing={2}
        className={classes.grid}
        alignItems="stretch"
      >
        {filteredEvents.map((event, index) => {
          return (
            <Grid item={true} key={index} xs={12} sm={6} md={4} lg={3}>
              <EventCard event={event} />
            </Grid>
          );
        })}
      </Grid>

      {isSmDown ? (
        <Fab
          className={classes.fab}
          color="secondary"
          size="medium"
          onClick={() => {
            setFilterDialog(true);
          }}
        >
          <FilterListIcon />
        </Fab>
      ) : null}
    </Grid>
  );
};

export default EventGrid;
