import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import StringUtils._
import java.sql.DriverManager
import java.sql.Connection

val r = RecordLoader.loadArchives("/directory/to/arc/file.arc.gz", sc)
  .keepValidPages()
  .map(r => r.getUrl)
  .take(10)

//http://alvinalexander.com/scala/scala-jdbc-connection-mysql-sql-select-example

object ScalaJdbcConnectSelect {

  def main(args: Array[String]) {
    // connect to the database named "mysql" on the localhost
    val driver = "com.mysql.jdbc.Driver"
    val url = "jdbc:mysql://localhost/mysql"
    val username = "root"
    val password = "root"

    // there's probably a better way to do this
    var connection:Connection = null

    try {
      // make the connection
      Class.forName(driver)
      connection = DriverManager.getConnection(url, username, password)

      // create the statement, and run the select query
      val statement = connection.createStatement()
      for(a <- )
      val resultSet = statement.executeQuery("INSERT INTO _ () VALUES ()")
    } catch {
      case e => e.printStackTrace
    }
    connection.close()
  }
}
