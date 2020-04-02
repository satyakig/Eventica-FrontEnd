import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategoriesAction } from 'redux/actions/AppStateActions';
import { DB_PATHS, getDb } from 'lib/Firebase';

const MetadataContainer = (): JSX.Element | null => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = getDb()
      .collection(DB_PATHS.METADATA)
      .doc('categories')
      .onSnapshot((doc) => {
        if (doc.exists) {
          dispatch(setCategoriesAction(doc.data()));
        }
      });

    return () => {
      return subscription();
    };
  }, [dispatch]);

  return null;
};

export default MetadataContainer;
