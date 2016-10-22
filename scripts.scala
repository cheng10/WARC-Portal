
import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import StringUtils._
import org.warcbase.spark.matchbox.TupleFormatter._

object script {
	def main(){
		val r = RecordLoader.loadArchives("/home/ubuntu/warcbase/warcbase-core/src/test/resources/arc/example.arc.gz", sc)
		.keepValidPages()
		.map(r => (r.getCrawlDate, r.getUrl, RemoveHTML(r.getContentString), ExtractImageLinks(r.getUrl, r.getContentString)))
		.saveAsTextFile("/home/ubuntu/me")
    }
}
