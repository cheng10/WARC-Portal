#!/bin/bash

function error_exit
{
	echo "${PROGNAME}: ${1:-"Unknown Error"}" 1>&2
	exit 1
}

echo `date` '	run_spark.sh started'

source ~/.bashrc
rm -rf /mnt/md0/spark_out
/opt/spark-1.6.1-bin-hadoop2.6/bin/spark-shell --driver-memory 4G --jars ~/warcbase/warcbase-core/target/warcbase-core-0.1.0-SNAPSHOT-fatjar.jar -i job.scala || error_exit "$LINENO: could not run spark, aborting"

echo `date` '	spark job finisehd'

mv /mnt/md0/warc_tmp/* /mnt/md0/warc_store || error_exit "$LINENO Could not move processed files, aborting"

echo `date` '	run_spark.sh finished'

