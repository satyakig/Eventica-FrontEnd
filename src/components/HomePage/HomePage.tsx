import React, { useEffect, useState } from 'react';
import EventGrid from '../EventGrid/EventGrid';
import { homePageStyles } from './HomePage.styles';
import { EventModal } from '../EventModal/EventModal';
import { clearSelectedEventAction } from '../../redux/actions/EventsActions';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/combinedReducer';
import { EventModel } from '../../redux/models/EventModel';

const HomePage = () => {
  const dispatch = useDispatch();

  const eventId = useSelector((state: ReduxState) => {
    return state.events.selectedEvent;
  });

  const event = useSelector((state: ReduxState) => {
    let rv = state.events.events.get(eventId);
    if (!rv) {
      rv = new EventModel();
    }
    return rv;
  });

  const classes = homePageStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (eventId) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [eventId]);

  function closeEventModal() {
    dispatch(clearSelectedEventAction());
  }

  return (
    <div className={classes.body}>
      <EventGrid />
      <EventModal openEventModal={isModalOpen} handleClose={closeEventModal} event={event} />
    </div>
  );
};

export default HomePage;
