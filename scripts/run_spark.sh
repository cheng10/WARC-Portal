#!/usr/bin/env bash

source ~/.bashrc
rm -rf ~/spark_out
/opt/spark-1.6.1-bin-hadoop2.6/bin/spark-shell --jars ~/warcbase/warcbase-core/target/warcbase-core-0.1.0-SNAPSHOT-fatjar.jar -i job.scala