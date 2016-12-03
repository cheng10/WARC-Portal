#!/bin/bash

PROGNAME=$(basename $0)
dir='/mnt/md0/warc_tmp'
PIDFILE="./$PROGNAME.pid"

# avoid duplicated process
if [ -f $PIDFILE ]
then
  PID=$(cat $PIDFILE)
  ps -p $PID > /dev/null 2>&1
  if [ $? -eq 0 ]
  then
    echo "Process already running"
    exit 1
  else
    ## Process not found assume not running
    echo $$ > $PIDFILE
    if [ $? -ne 0 ]
    then
      echo "Could not create PID file"
      exit 1
    fi
  fi
else
  echo "Creating PID file"
  echo $$ > $PIDFILE
  if [ $? -ne 0 ]
  then
    echo "Could not create PID file"
    exit 1
  fi
fi

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
source ~/.profile
export PATH="/home/ubuntu/bin:/home/ubuntu/.local/bin:/home/ubuntu/bin:/home/ubuntu/.local/bin:/home/ubuntu/bin:/home/ubuntu/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/local/java/jre1.8.0_111/bin:/usr/local/java/jdk1.8.0_111/bin:/usr/local/go/bin:/home/ubuntu/work/bin:/usr/local/go/bin:/home/ubuntu/go_work/bin"
rm -rf /mnt/md0/spark_out
/opt/spark-1.6.1-bin-hadoop2.6/bin/spark-shell --driver-memory 4G --jars ~/warcbase/warcbase-core/target/warcbase-core-0.1.0-SNAPSHOT-fatjar.jar -i job.scala || error_exit "$LINENO: could not run spark, aborting"
info_print '	spark job finished'

cd /mnt/md0/wayback_collection || error_exit "$LINENO Could not cd to wayback dir, aborting"

for file in "/mnt/md0/warc_tmp"/*
do
    info_print "adding $file to wayback"
    # wb-manager add warc_portal $file || error_exit "$LINENO Could not load warc files: $file to wayback, aborting"
    /usr/local/bin/wb-manager add warc_portal $file || error_exit "$LINENO Could not load warc files: $file to wayback, aborting"
done


info_print '	loaded data into wayback'

mv /mnt/md0/warc_tmp/* /mnt/md0/warc_store || error_exit "$LINENO Could not move processed files, aborting"

source /home/ubuntu/WARC-Portal/venv/bin/activate || error_exit "$LINENO: could not source venv, aborting"
cd /home/ubuntu/WARC-Portal/web_api || error_exit "$LINENO: could not cd to the web_api dir, aborting"
./manage.py parsedocs || error_exit "$LINENO: could not parse doc, aborting"
./manage.py get_info|| error_exit "$LINENO: could not fetch info, aborting"

info_print '	loaded data into Django'
info_print '	run_spark.sh finished'
rm $PIDFILE
