# react.js User Interface

https://facebook.github.io/react/docs/hello-world.html

### document.js
Classes for retrieving documents from the back end server

* getDocs works with types of documents

* getImages works on images.

### App.jsx

The react component of the main page that allows for tabbed browsing.

### DocElementList.jsx
React component for the individual elements of the list on homepage.

### DocumentList.jsx

React component for the feature of a document list.

* Allows updating of the list based on search queries.
* Enables pagination of results.
* Sets design and properties of the entire list.

### menu.jsx
React component for the top menu bar of the homepage which includes
the search box, and navigation buttons.

### URLBuilder.js
Builds a URL String from information for use in query strings (wayback)

### home.jsx
The react component linking the whole homepage together

### Images.jsx
The react class describing the image display gallery.

### NotFound.jsx
Page not found landing component.

### Reducers/docs.js
Describes how the state of the application changes
upon success of certain functions
* State upon success of fetch list
* State upon success of fetch image
* State when onLoad is executing

### Reducers/index.js
Describes how the state of the application changes
upon success of certain functions, dealing specifically
with calls to reducers.

### Reducers/index.js/cloneObject

Clone object helper function needed to make sure the copied object is immutable
Object.assign() copies by reference when deep cloning, so we can't use it
     <https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign>
Even though JSON functions don't work well with Date(), Regex() and functions,
this implementation is perfect for our needs. Redux needs the state to be serializable and sent to the redux tools,
which means that we couldn't store Date() in state even if we wanted to. Unless we screw the tools.

**Parameters**

-   `object`  

Returns **any**

### Sagas/documents.js
Sagas dealing specifically with documents:
* Call to fetch document list
* Call to fetch image list

### Sagas/index.js
Main saga generator - allows usage of sagas in the system.
Sagas allow side-effects (asynchronous calls) to occur
seamlessly.

### Stylesheets
http://sass-lang.com/

SASS files that dictate the style of our webpages.


### test
Built-in test components -- front end uses Selenium for
acceptance testing.

### app.js
This is the master file for our REACT JS front end.

Creates the middleware and stores necessary to operate the
sagas

Creates the page, and defines the paths a user can take through
interaction.

### server.js
Dictates the server settings for the front-end.

<!--


### sagas

Main saga generator



### constructor

**Parameters**

-   `param` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** this is param.
-   `props`  

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** this is return.

### NotFound

**Extends **

Not found page component

### changePage

Change the user lists' current page

**Parameters**

-   `page`  
-->
