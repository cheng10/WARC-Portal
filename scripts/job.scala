import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import StringUtils._
import org.warcbase.spark.matchbox.TupleFormatter._
import org.warcbase.spark.utils.JsonUtil

val r = RecordLoader.loadArchives("/home/ubuntu/files/umar.warc.gz", sc)
.keepValidPages()
.map(r => (r.getCrawlDate, r.getUrl, RemoveHTML(r.getContentString), ExtractImageLinks(r.getUrl, r.getContentString)))
.map(r => JsonUtil.toJson(r))
.saveAsTextFile("/home/ubuntu/spark_out")
