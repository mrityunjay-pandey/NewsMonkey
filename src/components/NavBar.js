import React from 'react';

const NavBar = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    'top',
    'business',
    'technology',
    'sports',
    'entertainment',
    'health',
    'science'
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-glass sticky-top">
      <div className="container-fluid px-3 px-md-4">
        <a className="navbar-brand" href="/">
          NewsMonkey
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categories.map((category) => (
              <li className="nav-item" key={category}>
                <button
                  type="button"
                  className={
                    'nav-link nav-link-pill btn btn-link ' +
                    (activeCategory === category ? 'nav-link-active' : '')
                  }
                  onClick={() => onCategoryChange?.(category)}
                >
                  {category === 'top'
                    ? 'Top Stories'
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <span className="badge-ml d-none d-md-inline">
            ML insights coming soon
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;