# WARC Portal

The University of Alberta and it's researchers have a collection of Web Archives, but does not have an easy way to analyze them. The WARC portal project aims to deal with extracting, searching and analyzing web archive files. We plan to provide intuitive and easy access for researchers to browse and search through thousands of possibly duplicated webpages, provide tools for analyzing their collections using an array of searches, filters; and provide helpful visualizations of their data by analyzing keywords used across the web pages and time. We will hopefully provide an invaluable tool for experienced digital humanities and social science researchers. It presents the web archive data in a intuitive way that will help researchers find overall patterns and trends.

**Features of WARC Portal:**

* Searching through archived webpages
* Searching through archived images
* Displaying webpages in original format
* Text and Image analysis

### Authors:

Cheng Chen: cheng10@ualberta.ca

Adriano Marini: marini@ualberta.ca

Kevin Tang: tkevin@ualberta.ca

Mate Verunica: verunica@ualberta.ca

## System Requirements

**OS**: Linux  |  **Storage**: 500GB+ free space

**Port Bindings:**
* :8080 - pywb
* :8000 - Django / REST API
* :5000 - Front end interface

## Dependencies

* [Front End](https://github.com/cheng10/WARC-Portal/blob/master/package.json)
* [Web server](https://github.com/cheng10/WARC-Portal/blob/master/web_api/requirements.txt)
* MySQL
* Scala Language Support
* Oracle Java JDK
* WARCBASE (see warcbase.readme)
* Apache Spark
* Pywb (see pywb.readme)
* npm
* node
* Apache Maven

## Elements

This system consists of 3 major components:

* Django back end
* MySQL Database
* React.js User Interface

In addition to:

* CRON scripts
* Scala scripts


## Installation
### Django / REST API

**Installation:**

1) || > virtualenv venv
2) || > source venv/bin/activate

3) || > pip install -r requirements.txt

**Testing the API (in folder):**

1) || > ./manage.py loaddata testdata.json

2) || > ./manage.py runserver

3) || > curl -H 'Accept: application/json; indent=4' -u admin:adminadmin <http://127.0.0.1:8000>

4) || > or just go to <http://127.0.0.1:8000/>, user:  admin:adminadmin

### React User Interface
**In order to run the interface permanantly, consider installing an Apache server
on your server, and copying the created 'public' folder into it's 'www' directory
for public service**

1) > npm install

2) > npm start

**If you choose the above method, npm will run the interface in the foreground,
accessible at localhost:5000**

### E2E Testing
You can run our E2E tests using Nightwatch and Selenium through this way.
> npm install -g nightwatch  

Alternatively, if you've already ran npm install, you can access the nightwatch binary through the node_modules.
Next you must update your webdrivers for selenium and chrome before running the tests found in selenium_tests.

> npm run e2e-setup  
> nightwatch  

### Scripts
<https://www.freebsd.org/cgi/man.cgi?query=cron&sektion=8&apropos=0&manpath=FreeBSD+10.3-RELEASE+and+Ports>

<http://askubuntu.com/questions/2368/how-do-i-set-up-a-cron-job>

Scripts use CRON to run. In order to prepare scripts:
  - Choose a directory in which you would like to store everything
  - Edit the scripts to ensure they point to the correct storage area
  - Set up cron to execute the job (see above websites)

### Selected Dependencies
* WARCBASE: <https://github.com/cheng10/WARC-Portal/blob/master/_doc/_readme/warcbase.readme>
* pywb: <https://github.com/cheng10/WARC-Portal/blob/master/_doc/_readme/pywb.readme>

## Documentation

### React User Interface

<https://github.com/cheng10/WARC-Portal/blob/master/_doc/_readme/webapp.md>

### Scripts

<https://github.com/cheng10/WARC-Portal/blob/master/_doc/_readme/scripts.readme>

### Django

<http://warc.tech:8000/admin/doc/> (admin:adminadmin)

### Rest API

<http://warc.tech:8000/docs>
