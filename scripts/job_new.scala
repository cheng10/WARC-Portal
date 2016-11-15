import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import StringUtils._
import org.warcbase.spark.matchbox.TupleFormatter._
import org.warcbase.spark.utils.JsonUtil
import java.io._

var warc="/mnt/md0/warc_tmp/"
val fileList = new File(warc).list

// extract html
for (file <- fileList) {
    val r = RecordLoader.loadArchives(warc+file, sc)
    .keepValidPages()
    .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, r.getContentString, ExtractImageLinks(r.getUrl, r.getContentString)))
    .map(r => JsonUtil.toJson(r))
    .saveAsTextFile("/mnt/md0/spark_out/"+file)
    }

// extract images
for (file <- fileList) {
    val r = RecordLoader.loadArchives(warc+file, sc)
    .keepValidPages()
    .flatMap(r => ExtractImageLinks(r.getUrl, r.getContentString))
    .countItems()
    .map(r => JsonUtil.toJson(r))
    .saveAsTextFile("/mnt/md0/spark_image/"+file)
    }

// extract pdf
for (file <- fileList) {
    val r = RecordLoader.loadArchives(warc+file, sc)
    .keepMimeTypes(Set("application/pdf"))
    .map(r => (r.getCrawlDate, r.getMimeType, r.getDomain, r.getUrl))
    .map(r => JsonUtil.toJson(r))
    .saveAsTextFile("/mnt/md0/spark_pdf/"+file)
    }

// extract site link
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

for (file <- fileList){
  RecordLoader.loadArchives("src/test/resources/arc/example.arc.gz", sc)
  .keepValidPages()
  .map(r => (RemoveHTML(r.getContentString)))
  .saveAsTextFile("/mnt/md0/spark_text/"+file)
}

exit()
