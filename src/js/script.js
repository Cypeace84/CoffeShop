import { settings, select, templates, classNames } from './settings.js';
import utils from './utils.js';

class Products {
  constructor(id, data) {
    const thisProducts = this;

    thisProducts.id = id;
    thisProducts.data = data;

    //thisProducts.element = element;

    thisProducts.render();
  }

  render() {
    const thisProducts = this;

    const generateHTML = templates.productsPage(thisProducts.data);

    thisProducts.dom = thisProducts.data;

    const generateDom = utils.createDOMFromHTML(generateHTML);
    const productsHomeContainer = document.querySelector(
      select.containerOf.product
    );
    const productsPageContainer = document.querySelector(
      select.containerOf.productsPage
    );

    if (productsHomeContainer.parentElement.classList.contains('active')) {
      productsHomeContainer.appendChild(generateDom);
    }

    productsPageContainer.appendChild(generateDom);
  }
}

const app = {
  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');

        // if (id == 'products') {
        //   for (let pr in thisApp.data.products) {
        //     new Products(
        //       thisApp.data.products[pr].id,
        //       thisApp.data.products[pr]
        //     );
        //     console.log('pr', pr);
        //   }
        // }

        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);
        /*  change URL hash*/
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

    /*add class "active" to matching pages, remove from non-matching */
    for (let page of thisApp.pages) {
      // if(page.id == pageId){
      //   page.classList.add(classNames.pages.active);
      // } else {
      //   page.classList.remove(classNames.pages.active);
      // }
      // toggle w przeciwienstwie do add
      // i remove moze przyjąć równiez parametr np. poyszczy warunek
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /*add class "active" to matching links, remove from non-matching */
    // for (let link of thisApp.navLinks) {
    //   link.classList.toggle(
    //     classNames.nav.active,
    //     link.getAttribute('href') == '#' + pageId
    //   );
    // }
  },

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
        thisApp.initProducts();
      });
  },
  init: function () {
    const thisApp = this;
    thisApp.initData();
    thisApp.initPages();
    //thisApp.initProducts();
  },
  initProducts: function () {
    const thisApp = this;

    //const products = document.querySelector(select.containerOf.product);
    //thisApp.products = new Products(products);

    for (let pr in thisApp.data.products) {
      new Products(thisApp.data.products[pr].id, thisApp.data.products[pr]);
      console.log('pr', pr);
    }
  },
};

app.init();
