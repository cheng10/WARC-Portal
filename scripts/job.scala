import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import StringUtils._
import org.warcbase.spark.matchbox.TupleFormatter._
import org.warcbase.spark.utils.JsonUtil
import java.io._

var warc="/mnt/md0/warc_tmp/"
val array = new File(warc).list
println(array.deep.mkString("\n"))
//val r = RecordLoader.loadArchives(warc, sc)
//.keepValidPages()
//.map(r => (r.getCrawlDate, r.getDomain, r.getUrl, r.getContentString, ExtractImageLinks(r.getUrl, r.getContentString)))
//.map(r => JsonUtil.toJson(r))
//.saveAsTextFile("/mnt/md0/spark_out")
//exit()
