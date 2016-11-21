#!/bin/bash

PROGNAME=$(basename $0)
dir='/mnt/md0/warc_tmp'

function error_exit
{
	echo "${PROGNAME}: ${1:-"Unknown Error"}" 1>&2
	exit 1
}

function info_print
{
	echo `date` "${PROGNAME}: ${1:-"default info"}" 2>&1
}

info_print '	run_spark.sh started'

if [ "$(ls ${dir})" ]
then
	info_print '	dir not clean, running spark'
else
	info_print '	dir clean, exit'
	exit 0
fi

source ~/.bashrc
source /home/ubuntu/WARC-Portal/venv/bin/activate || error_exit "$LINENO: could not source venv, aborting"
cd /home/ubuntu/WARC-Portal/web_api || error_exit "$LINENO: could not cd to the web_api dir, aborting"
nohup ./manage.py runserver 0.0.0.0:8000 \& || error_exit "$LINENO: could not calculate tf_idf score, aborting"

info_print "${PROGNAME} finished"