#!/bin/bash

dir='/mnt/md0'
rm -rf ${dir}/spark_*/
mv ${dir}/warc_store/* ${dir}/warc_tmp/
tree ${dir}

