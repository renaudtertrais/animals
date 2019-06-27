import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, Tooltip, Tag, Button } from 'antd';

import store from './store';
import Layout from './Layout';
import { displayCount } from './helpers';

const { Column } = Table;

function renderTypeEmoji(emoji, type) {
  return (
    <Tooltip title={type.cry} placement="bottom">
      <div className="AnimalEmoji">{emoji}</div>
    </Tooltip>
  );
}

const renderAnimalsCount = animals => (_, type) => {
  const count = animals.filter(({ idType }) => idType === type.id).length;
  return <Link to={`/type/${type.id}`}>See {displayCount(count, 'animal')}</Link>;
};

const renderAnimalsDiet = animals => (_, type) => {
  return animals
    .filter(({ idType }) => idType === type.id)
    .map(animal => (
      <Tag color="blue" key={animal.id}>
        {animal.diet}
      </Tag>
    ));
};

function renderAddAnimal(_, type) {
  return (
    <Link to={`/type/${type.id}/new`}>
      <Button type="primary">+ Add</Button>
    </Link>
  );
}

function GlobalList() {
  const { types, animals } = useContext(store);
  return (
    <Layout title={`${animals.length} animals`}>
      <div className="GlobalList">
        <Table dataSource={types} rowKey="id">
          <Column title="" dataIndex="emoji" render={renderTypeEmoji} width={80} />
          <Column title="Type" dataIndex="name" />
          <Column title="Diet" key="diet" render={renderAnimalsDiet(animals)} />
          <Column title="Feature" dataIndex="feature" />
          <Column title="" key="individuals" render={renderAnimalsCount(animals)} width={150} />
          <Column title="" key="add" render={renderAddAnimal} width={100} />
        </Table>
      </div>
    </Layout>
  );
}

export default GlobalList;
