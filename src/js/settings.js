/* global Handlebars,*/
export const select = {
  templateOf: {
    home: '#template-home',
    products: '#template-products',
    header: '#template-header',
  },
  containerOf: {
    pages: '#pages',
    home: '#home',
    productsPage: '#page-products',
    products: '#products',
    product: '#products-page',
    about: '#about',
    contact: '#contact',
    header: '#header',
  },
  nav: '.nav a',
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
};

export const templates = {
  productsPage: Handlebars.compile(
    document.querySelector(select.templateOf.products).innerHTML
  ),

  homePage: Handlebars.compile(
    document.querySelector(select.templateOf.home).innerHTML
  ),
  headerTitle: Handlebars.compile(
    document.querySelector(select.templateOf.header).innerHTML
  ),
};

export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    products: 'products',
    titles: 'titles',
  },
};
