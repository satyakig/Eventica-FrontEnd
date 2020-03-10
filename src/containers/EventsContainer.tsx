import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { DB_PATHS, getDb } from 'lib/Firebase';
import { EVENT_TYPE, EventType, EventUserType } from 'redux/models/EventModel';
import { setEventsAction, setUserEventAction } from 'redux/actions/EventsActions';

const EventsContainer = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const userId = useSelector((state: ReduxState) => {
    return state.user.uid;
  });

  const [eventUsers, setEventUsers] = useState<EventUserType[]>([]);

  useEffect(() => {
    if (userId) {
      const unsubscribe = getDb()
        .collection(DB_PATHS.EVENTS)
        .where('type', '==', EVENT_TYPE.PUBLIC)
        .onSnapshot((doc) => {
          const data = doc.docs.map((value) => {
            return value.data() as EventType;
          });

          dispatch(setEventsAction(data));
        });

      return () => {
        return unsubscribe();
      };
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      const unsubscribe = getDb()
        .collection(DB_PATHS.EVENT_USERS)
        .where('uid', '==', userId)
        .onSnapshot(
          (doc) => {
            const data = doc.docs.map((value) => {
              return value.data() as EventUserType;
            });

            setEventUsers(data);
          },
          () => {
            setEventUsers([]);
          },
        );

      return () => {
        return unsubscribe();
      };
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const unsubs: any[] = [];

    if (eventUsers.length > 0) {
      for (const eventUser of eventUsers) {
        const unsub = getDb()
          .collection(DB_PATHS.EVENTS)
          .where('eid', '==', eventUser.eid)
          .onSnapshot((doc) => {
            if (doc.docs.length === 1) {
              const data = doc.docs[0].data() as EventType;

              dispatch(setUserEventAction(data, eventUser));
            }
          });

        unsubs.push(unsub);
      }
    }

    return () => {
      for (const unsub of unsubs) {
        unsub();
      }
    };
  }, [eventUsers, dispatch]);

  return null;
};

export default EventsContainer;
