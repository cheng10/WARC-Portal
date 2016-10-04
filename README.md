# WARC-Portal
The University of Alberta and it's researchers have a collection of Web Archives, but does not have an easy way to analyze them. The WARC portal project aims to deal with extracting, searching and analyzing web archive files. We plan to provide intuitive and easy access for researchers to browse and search through thousands of possibly duplicated webpages, provide tools for analyzing their collections using an array of searches, filters; and provide helpful visualizations of their data by analyzing keywords used across the web pages and time. We will hopefully provide an invaluable tool for experienced digital humanities and social science researchers. It presents the web archive data in a intuitive way that will help researchers find overall patterns and trends.

## Installation
> virtualenv venv  
> source venv/bin/activate  
> pip install -r requirements.txt 

Django superuser: admin:testadmin

to test the api:  
> python manage.py runserver  
> curl -H 'Accept: application/json; indent=4' -u admin:testadmin http://127.0.0.1:8000/api/users/


### Front end:
Requirements:
* Node 4.0.0 or above

> npm install
> npm start

then visit localhost:8080 when bundle is built.
