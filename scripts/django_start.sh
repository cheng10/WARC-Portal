#!/bin/bash

PROGNAME=$(basename $0)

function error_exit
{
	echo "${PROGNAME}: ${1:-"Unknown Error"}" 1>&2
	exit 1
}

function info_print
{
	echo `date` "${PROGNAME}: ${1:-"default info"}" 2>&1
}

info_print ' started'

source ~/.bashrc
source /home/ubuntu/WARC-Portal/venv/bin/activate || error_exit "$LINENO: could not source venv, aborting"
cd /home/ubuntu/WARC-Portal/web_api || error_exit "$LINENO: could not cd to the web_api dir, aborting"
./manage.py runserver 0.0.0.0:8000 || error_exit "$LINENO: could not runserver, aborting"

info_print " finished"
