/* global Handlebars,*/
export const select = {
  templateOf: {
    products: '#template-products',
    // menuProduct: '#template-menu-product',
    // cartProduct: '#template-cart-product', // CODE ADDED
    // bookingWidget: '#template-booking-widget',
    //homePage: '#template-home-page',
  },
  containerOf: {
    products: '#products-page',
  },
};

export const classNames = {
  // menuProduct: {
  //   wrapperActive: 'active',
  //   imageVisible: 'active',
  // },
  //   cart: {
  //     wrapperActive: 'active',
  //   },
  //   booking: {
  //     loading: 'loading',
  //     tableBooked: 'booked',
  //     selected: 'selected',
  //     table: 'table', ////////////////////////
  //   },
  //   nav: {
  //     active: 'active',
  //   },
  //   pages: {
  //     active: 'active',
  //   },
};

export const templates = {
  productsPage: Handlebars.compile(
    document.querySelector(select.templateOf.products).innerHTML
  ),
};

export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    products: 'products',
  },
};
