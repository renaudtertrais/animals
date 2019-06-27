import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

import data from './data';
import store from './store';

import GlobalList from './GlobalList';
import SpecificList from './SpecificList';
import NewAnimal from './NewAnimal';
import './index.css';

function App() {
  const [{ animals, types }, setStore] = useState(data);

  const addAnimal = (idType, animal) =>
    setStore(state => ({ ...state, animals: [...state.animals, { ...animal, idType }] }));

  const removeAnimal = animal =>
    setStore(state => ({ ...state, animals: state.animals.filter(({ id }) => id !== animal.id) }));

  return (
    <Router>
      <store.Provider value={{ animals, types, addAnimal, removeAnimal }}>
        <Switch>
          <Route path="/type/:idType/new" component={NewAnimal} />
          <Route path="/type/:idType" component={SpecificList} />
          <Route path="/" component={GlobalList} />
        </Switch>
      </store.Provider>
    </Router>
  );
}

export default App;
