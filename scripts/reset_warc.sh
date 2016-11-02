#!/bin/bash

dir='/mnt/md0'
rm -rf ${dir}/spark_out/
mv ${dir}/warc_store/* ${dir}/warc_tmp/
tree ${dir}

