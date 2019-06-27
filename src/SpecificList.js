import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, Tooltip, Tag, Button } from 'antd';

import store from './store';
import { displayCount } from './helpers';
import Layout from './Layout';

const { Column } = Table;

const renderTypeEmoji = type => (_, animal) => {
  return (
    <Tooltip title={`${type.cry} ${animal.cry}`} placement="bottom">
      <div className="AnimalEmoji">{type.emoji}</div>
    </Tooltip>
  );
};

function renderAnimalsDiet(diet) {
  return <Tag color="blue">{diet}</Tag>;
}

const renderRemoveAnimal = removeAnimal => (_, animal) => (
  <Button type="danger" onClick={() => removeAnimal(animal)}>
    Remove
  </Button>
);

function SpecificList({ match, history }) {
  const { types, animals, removeAnimal } = useContext(store);

  const currentType = types.find(type => type.id === match.params.idType);
  if (!currentType) return history.push('/');

  const animalsOfCurrentType = animals.filter(animal => animal.idType === currentType.id);

  return (
    <Layout
      title={displayCount(animalsOfCurrentType.length, currentType.name)}
      breadcrumb={[{ url: `/type/${currentType.id}`, title: currentType.name }]}
      actions={
        <Link to={`/type/${currentType.id}/new`}>
          <Button type="primary">+ Add</Button>
        </Link>
      }
    >
      <div className="SpecificList">
        <Table dataSource={animalsOfCurrentType} rowKey="id">
          <Column title="" dataIndex="emoji" render={renderTypeEmoji(currentType)} width={80} />
          <Column title="Name" dataIndex="name" />
          <Column title="Age" dataIndex="age" />
          <Column title="Diet" dataIndex="diet" render={renderAnimalsDiet} />
          <Column title="" key="remove" render={renderRemoveAnimal(removeAnimal)} width={100} />
        </Table>
      </div>
    </Layout>
  );
}

export default SpecificList;
