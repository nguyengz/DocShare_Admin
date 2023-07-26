import React, { useEffect } from 'react';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

const App = () => {
  useEffect(() => {
    // Check if the page is being unloaded due to a page refresh or due to the page being closed
    const handleBeforeUnload = (event) => {
      if (!event.currentTarget.performance.navigation.type === event.currentTarget.performance.navigation.TYPE_RELOAD) {
        // Remove the data from local storage if the page is being closed or the browser is being closed
        localStorage.removeItem('user');
      }
    };
    // Add the event listener for the beforeunload event
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Return the cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
