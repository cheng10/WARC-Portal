import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.RecordLoader

val r = RecordLoader.loadArchives("/mnt/md0/warc_store",sc).persist()
ExtractPopularImages(r, 2000, sc).saveAsTextFile("/mnt/md0/image_ranking")
