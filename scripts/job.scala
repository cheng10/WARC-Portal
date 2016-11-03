import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import StringUtils._
import org.warcbase.spark.matchbox.TupleFormatter._
import org.warcbase.spark.utils.JsonUtil
import java.io._

var warc="/mnt/md0/warc_tmp/"
val fileList = new File(warc).list

for (file <- fileList) {
    val r = RecordLoader.loadArchives(warc+file, sc)
    .keepValidPages()
    .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, r.getContentString, ExtractImageLinks(r.getUrl, r.getContentString)))
    .map(r => JsonUtil.toJson(r))
    .saveAsTextFile("/mnt/md0/spark_out/"+file)
    }

for (file <- fileList) {
    val r = RecordLoader.loadArchives(warc+file, sc)
    .keepValidPages()
    .flatMap(r => ExtractImageLinks(r.getUrl, r.getContentString))
    .countItems()
    .map(r => JsonUtil.toJson(r))
    .saveAsTextFile("/mnt/md0/spark_image/"+file)
    }

exit()
