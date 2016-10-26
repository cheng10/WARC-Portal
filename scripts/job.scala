import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import StringUtils._
import org.warcbase.spark.matchbox.TupleFormatter._
import org.warcbase.spark.utils.JsonUtil

var warc="/mnt/md0/warc_tmp/"
val r = RecordLoader.loadArchives(warc, sc)
.keepValidPages()
.map(r => (r.getCrawlDate, r.getUrl, RemoveHTML(r.getContentString), ExtractImageLinks(r.getUrl, r.getContentString)))
.map(r => JsonUtil.toJson(r))
.saveAsTextFile("/mnt/md0/spark_out")
exit()
