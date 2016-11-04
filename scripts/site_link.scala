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
    .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
    .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
    .filter(r => r._1 != "" && r._2 != "")
    .countItems()
    .filter(r => r._2 > 5)
    .saveAsTextFile("/mnt/md0/spark_sitelink/"+file)
    }

exit()
