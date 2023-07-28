import React, { useEffect, useState } from 'react';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

const App = () => {
  const [shouldRemoveData, setShouldRemoveData] = useState(false);

  const handleBeforeUnload = (event) => {
    if (!event.persisted) {
      setShouldRemoveData(true);
      event.preventDefault();
      event.returnValue = '';
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const navigationType = window.performance.navigation.type;
    if (shouldRemoveData && (navigationType === 0 || navigationType === 255)) {
      localStorage.removeItem('user');
      setShouldRemoveData(false);
    }
  }, [shouldRemoveData]);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
