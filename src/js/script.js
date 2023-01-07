import { settings, select, templates } from './settings.js';
import utils from './utils.js';

class Products {
  constructor(element) {
    const thisProducts = this;

    thisProducts.element = element;

    thisProducts.render();
  }

  render() {
    const thisProducts = this;

    const generateHTML = templates.productsPage();

    thisProducts.dom = thisProducts.element;

    const generateDom = utils.createDOMFromHTML(generateHTML);

    thisProducts.dom.appendChild(generateDom);
  }
}

const app = {
  initData: function () {
    const thisApp = this;
    const url = settings.db.url + '/' + settings.db.products;
    console.log('url', url);
    thisApp.data = {};
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.data.products = parsedResponse;
        console.log(parsedResponse);
        console.log('data', thisApp.data.products);
      });
  },
  init: function () {
    const thisApp = this;
    thisApp.initData();
    thisApp.initProducts();
  },
  initProducts: function () {
    const thisApp = this;

    const products = document.querySelector(select.containerOf.products);
    thisApp.products = new Products(products);
  },
};
app.init();
