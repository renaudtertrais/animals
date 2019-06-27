import React from 'react';
import { Link } from 'react-router-dom';
import { Layout as AntLayout, Breadcrumb } from 'antd';

const { Header, Footer } = AntLayout;

function Layout({ children, title, search, onSearch, actions, breadcrumb }) {
  return (
    <div className="Layout">
      <Header className="Layout__header">
        <div className="Layout__title">{title}</div>
        {onSearch && (
          <input
            type="search"
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search..."
          />
        )}
        {actions && <div className="Layout__actions">{actions}</div>}
      </Header>
      <div className="Layout__breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          {breadcrumb.map(({ title, url }) => (
            <Breadcrumb.Item key={url}>
              <Link to={url}>{title}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="Layout__main">{children}</div>
      <Footer className="Layout__footer">Renaud Tertrais ©2019</Footer>
    </div>
  );
}

Layout.defaultProps = {
  breadcrumb: [],
};

export default Layout;
