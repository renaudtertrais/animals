import React, { useContext, useState } from 'react';
import { Input, Form, Button } from 'antd';

import store from './store';

import Layout from './Layout';

function NewAnimal({ match, history }) {
  const { types, addAnimal } = useContext(store);
  const [values, setValues] = useState({});

  const currentType = types.find(type => type.id === match.params.idType);
  if (!currentType) return history.push('/');

  const handleChange = (field, isNumber) => e =>
    setValues({ ...values, [field]: isNumber ? parseInt(e.target.value, 10) : e.target.value });
  const { name, age, diet, cry } = values;

  return (
    <Layout
      title={`New ${currentType.name}`}
      breadcrumb={[
        { url: `/type/${currentType.id}`, title: currentType.name },
        { url: `/type/${currentType.id}/new`, title: 'New' },
      ]}
    >
      <div className="NewAnimal">
        <Form
          labelCol={{
            sm: { span: 6 },
          }}
          wrapperCol={{
            sm: { span: 6 },
          }}
        >
          <Form.Item label="Name">
            <Input
              id="NewAnimal__name"
              type="text"
              value={name}
              onChange={handleChange('name')}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item label="Age">
            <Input
              id="NewAnimal__age"
              type="number"
              min="0"
              step="1"
              value={age}
              onChange={handleChange('age', true)}
              placeholder="Age"
            />
          </Form.Item>

          <Form.Item label="Diet">
            <Input
              id="NewAnimal__diet"
              type="text"
              value={diet}
              onChange={handleChange('diet')}
              placeholder="Diet"
            />
          </Form.Item>

          <Form.Item label="Cry">
            <Input
              id="NewAnimal__cry"
              type="text"
              value={cry}
              onChange={handleChange('cry')}
              placeholder="Cry"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              sm: { span: 6, offset: 6 },
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                addAnimal(currentType.id, values);
                history.push(`/type/${currentType.id}`);
              }}
              disabled={(xs =>
                xs.length < 4 || xs.some(val => ['', null, undefined].includes(val)))(
                Object.values(values)
              )}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}

export default NewAnimal;
