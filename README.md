# WARC Portal

The University of Alberta and it's researchers have a collection of Web Archives, but does not have an easy way to analyze them. The WARC portal project aims to deal with extracting, searching and analyzing web archive files. We plan to provide intuitive and easy access for researchers to browse and search through thousands of possibly duplicated webpages, provide tools for analyzing their collections using an array of searches, filters; and provide helpful visualizations of their data by analyzing keywords used across the web pages and time. We will hopefully provide an invaluable tool for experienced digital humanities and social science researchers. It presents the web archive data in a intuitive way that will help researchers find overall patterns and trends.

**Features of WARC Portal:**

- Searching through archived webpages
- Searching through archived images
- Displaying webpages in original format
- Text and Image analysis

### Authors:

Cheng Chen | Adriano Marini | Kevin Tang | Mate Verunica

## System Requirements

**OS**: Linux  |  **Storage**: 500GB+ free space

## Dependencies

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

## Port Bindings

- Port 8080: Pywb

## Installation
### Django / REST API

Installation:

1) > virtualenv venv
2) > source venv/bin/activate
3) > pip install -r requirements.txt

Testing the API (in folder):

1) > ./manage.py loaddata testdata.json
2) > ./manage.py runserver
3) > curl -H 'Accept: application/json; indent=4' -u admin:adminadmin <http://127.0.0.1:8000>
4) > or just go to <http://127.0.0.1:8000/>, user:  admin:adminadmin

### React User Interface

### Scripts

### Selected Dependencies
* WARCBASE:
* pywb:

## Documentation

### React User Interface

### Scripts

### Detailed Django Documentation

<http://warc.tech:8000/admin/doc/> (admin:adminadmin)

### Rest API Documentation

<http://warc.tech:8000/docs>
