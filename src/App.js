import './App.css';

import React from 'react';
import NavBar from './components/NavBar';
import News from './News';

const App = () => {
  const [activeCategory, setActiveCategory] = React.useState('top');

  return (
    <>
      <NavBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {/* Category is also managed locally in News; this prop is kept
          so you can later lift state or plug in routing if desired. */}
      <News />
    </>
  );
};

export default App;
