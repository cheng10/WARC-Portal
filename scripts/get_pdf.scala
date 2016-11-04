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
    .keepMimeTypes(Set("application/pdf"))
    .map(r => (r.getCrawlDate, r.getMimeType, r.getDomain, r.getUrl))
    .map(r => JsonUtil.toJson(r))
    .saveAsTextFile("/mnt/md0/spark_pdf/"+file)
    }

exit()
