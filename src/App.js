// src/App.js
import React, { useState } from 'react';
import Dashboard from './Dashboard.js';



const App = () => {
  // Initial categories and widgets data
  const [categories, setCategories] = useState([
    {
      name: "CSPM Executive Dashboard",
      widgets: [
        { id: 1, name: "Widget 1", text: "This is widget 1 content." },
        { id: 2, name: "Widget 2", text: "This is widget 2 content." }
      ]
    },
    {
      name: "Security Dashboard",
      widgets: [
        { id: 3, name: "Widget 3", text: "This is widget 3 content." }
      ]
    }
  ]);

  return (
    <div className="App">
      <Dashboard categories={categories} />
    </div>
  );
};

export default App;

