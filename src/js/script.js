import { settings, select, templates, classNames } from './settings.js';
import utils from './utils.js';

// class Home {
//   constructor(element) {
//     const thisHome = this;

//     thisHome.element = element;

//     thisHome.render();
//   }

//   render() {
//     const thisHome = this;

//     const generateHTML = templates.homePage(thisHome.element);

//     thisHome.dom = thisHome.element;

//     const generateDom = utils.createDOMFromHTML(generateHTML);

//     const homeContainer = document.querySelector(select.containerOf.home);

//     homeContainer.appendChild(generateDom);
//   }
// }
class Home {
  constructor(id, data) {
    const thisHome = this;

    thisHome.id = id;
    thisHome.data = data;

    thisHome.render();
  }

  render() {
    const thisHome = this;

    const generateHTML = templates.productsPage(thisHome.data);

    thisHome.dom = thisHome.data;

    const generateDom = utils.createDOMFromHTML(generateHTML);

    const productsHome = document.querySelector(select.containerOf.products);

    productsHome.appendChild(generateDom);
  }
}

class Title {
  constructor(title) {
    const thisTitle = this;

    thisTitle.title = title;

    thisTitle.render();
  }

  render() {
    const thisTitle = this;

    const generateHTML = templates.headerTitle(thisTitle.title);
    const generateDom = utils.createDOMFromHTML(generateHTML);
    const titleContainer = document.querySelector(select.containerOf.header);

    titleContainer.appendChild(generateDom);
  }
}

class Products {
  constructor(id, data) {
    const thisProducts = this;

    thisProducts.id = id;
    thisProducts.data = data;

    thisProducts.render();
  }

  render() {
    const thisProducts = this;

    const generateHTML = templates.productsPage(thisProducts.data);

    thisProducts.dom = thisProducts.data;

    const generateDom = utils.createDOMFromHTML(generateHTML);

    const productsPageContainer = document.querySelector(
      select.containerOf.productsPage
    );

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
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
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
        thisApp.initHome();
        thisApp.initProducts();
      });

    const urlTitles = settings.db.url + '/' + settings.db.titles;
    fetch(urlTitles)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.data.titles = parsedResponse;
        console.log(parsedResponse);
        console.log('data', thisApp.data.titles);
        thisApp.initTitle();
      });
  },
  init: function () {
    const thisApp = this;
    thisApp.initData();
    thisApp.initPages();
  },

  initHome: function () {
    const thisApp = this;
    for (let pr in thisApp.data.products) {
      new Home(thisApp.data.products[pr].id, thisApp.data.products[pr]);
      console.log('pr', pr);
    }
  },

  initProducts: function () {
    const thisApp = this;

    for (let pr in thisApp.data.products) {
      new Products(thisApp.data.products[pr].id, thisApp.data.products[pr]);
      console.log('pr', pr);
    }
  },

  initTitle: function () {
    const thisApp = this;

    let titleNumber = 0;
    titleNumber = Math.floor(Math.random() * 3 + 1);

    const title = thisApp.data.titles[titleNumber];

    new Title(title);
  },
};

app.init();
