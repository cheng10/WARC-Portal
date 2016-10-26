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

info_print '	run_spark.sh started'

source ~/.bashrc
rm -rf /mnt/md0/spark_out
/opt/spark-1.6.1-bin-hadoop2.6/bin/spark-shell --driver-memory 4G --jars ~/warcbase/warcbase-core/target/warcbase-core-0.1.0-SNAPSHOT-fatjar.jar -i job.scala || error_exit "$LINENO: could not run spark, aborting"

info_print '	spark job finisehd'

mv /mnt/md0/warc_tmp/* /mnt/md0/warc_store || error_exit "$LINENO Could not move processed files, aborting"

source /home/ubuntu/WARC-Portal/venv/bin/activate || error_exit "$LINENO: could not source venv, aborting"
cd /home/ubuntu/WARC-Portal/web_api || error_exit "$LINENO: could not cd to the web_api dir, aborting"
./manage.py parsedocs || error_exit "$LINENO: could not parse doc, aborting"

info_print '	loaded data into Django'

info_print '	run_spark.sh finished'

