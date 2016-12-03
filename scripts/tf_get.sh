#!/bin/bash

PROGNAME=$(basename $0)
PIDFILE="/home/ubuntu/$PROGNAME.pid"

function error_exit
{
	echo "${PROGNAME}: ${1:-"Unknown Error"}" 1>&2
    rm $PIDFILE
	exit 1
}

function info_print
{
	echo `date` "${PROGNAME}: ${1:-"default info"}" 2>&1
}

# avoid duplicated process
if [ -f $PIDFILE ]
then
  PID=$(cat $PIDFILE)
  ps -p $PID > /dev/null 2>&1
  if [ $? -eq 0 ]
  then
    info_print "Process already running"
    exit 1
  else
    ## Process not found assume not running
    echo $$ > $PIDFILE
    if [ $? -ne 0 ]
    then
      info_print "Could not create PID file"
      exit 1
    fi
  fi
else
  info_print "Creating PID file"
  echo $$ > $PIDFILE
  if [ $? -ne 0 ]
  then
    info_print "Could not create PID file"
    exit 1
  fi
fi


info_print '    started'

source ~/.bashrc
source ~/.profile
export PATH="/home/ubuntu/bin:/home/ubuntu/.local/bin:/home/ubuntu/bin:/home/ubuntu/.local/bin:/home/ubuntu/bin:/home/ubuntu/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/local/java/jre1.8.0_111/bin:/usr/local/java/jdk1.8.0_111/bin:/usr/local/go/bin:/home/ubuntu/work/bin:/usr/local/go/bin:/home/ubuntu/go_work/bin"

source /home/ubuntu/WARC-Portal/venv/bin/activate || error_exit "$LINENO: could not source venv, aborting"
cd /home/ubuntu/WARC-Portal/web_api || error_exit "$LINENO: could not cd to the web_api dir, aborting"
./manage.py tf_idf|| error_exit "$LINENO: could not calculate tf-idf score, aborting"

info_print '	finished'
rm $PIDFILE
