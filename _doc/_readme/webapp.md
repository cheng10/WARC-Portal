# react.js User Interface

https://facebook.github.io/react/docs/hello-world.html

## General Flow

**Component / Page --> Saga --> API --> Saga --> Reducer --> Component/Page**

### auth.js
API classes for handling authentication with the Django backend

* Login deals with login into the django backend.

### collection.js
API classes for communicating with the Django backend for the purposes
of getting and creating collections

* getCollections gets a list of the current user's collections

* getFiles gets a list of the files currently in the System

* postCollections creates a new collection from selected files


### document.js
Classes for retrieving documents from the back end server

* getDocs works with types of documents

* getImages works on images.

### filter.js
API class for retrieving filters from the Django backend

* getFilters returns all filters

### App.jsx
The react component describing the body of the app.

### Content.jsx
The react component describing the tabbed browsing of the main page.

Dictates the navigation between the search, images, and login tabs.

### DateField.jsx
React component for the date picker of the toolbar.

### DocElementList.jsx
React component for the individual elements of the list on homepage.

### DocumentList.jsx
React component for the feature of a document list.

* Allows updating of the list based on search queries.
* Enables pagination of results.
* Sets design and properties of the entire list.

### FilterOptions.jsx
The react component that deals with the filtering options on the side
of the page

Collects all of the options, and renders them into a list, and then handles
their selection and the changes as a result of the selections.

### Menu.jsx
React component for the top menu bar of the homepage which includes
the search box, and navigation buttons.

### Toolbar.jsx
The filtering toolbar that allows for searching within dates / collections

### URLBuilder.js
Builds a URL String from passed information for use in query strings

### Collections.jsx
The react component for the collections management page

Handles rendering the collection list, and a list of files that can be selected
and named into a new collection

### Login.jsx
The react component for the login form

### Images.jsx
The react class describing the image display gallery.

### NotFound.jsx
Page not found landing component.

### Visualizations.jsx
Renders the tf-idf graph.

### WordCloud.jsx
Renders the wordcloud 

## Reducers
Reducers handle the connection between the sagas and the API, allowing for
changes in state based on the returns from the API calls.

### Reducers/auth.js
Handles the state changes as a result of authentication.

### Reducers/collections.js
Handles state changes as a result of obtaining collections.

### Reducers/docs.js
Describes how the state of the application changes
upon success of certain functions
* State upon success of fetch list
* State upon success of fetch image
* State when onLoad is executing

### Reducers/files.js
Handles state changes as a result of obtaining lists of file names.

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

## Sagas
Sagas are called by react components, and rely on a reducer to send through requests
to the API and back.

### Sagas/auth.js
Handles Redux flow for the API calls of authentication. Returns all necessary
information for proper authentication

### Sagas/collections.js
Handles the redux flow for obtaining lists of collections and posting new collections to the database.


### Sagas/documents.js
Sagas dealing specifically with documents:
* Call to fetch document list
* Call to fetch image list

### Sagas/files.js
Handles the redux flow for obtaining lists of files from the databasee.

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
