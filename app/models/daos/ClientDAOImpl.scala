package models.daos

import java.util.Date
import javax.inject.Inject

import models.Client
import models.daos.ClientDAOImpl._
import models.tables.{ ClientTable, DbClient }
import play.api.Logger
import play.api.db.slick.DatabaseConfigProvider
import slick.backend.DatabaseConfig
import slick.driver.JdbcProfile
import slick.jdbc.JdbcBackend
import slick.lifted.TableQuery

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.Success

class ClientDAOImpl @Inject() (protected val dbConfigProvider: DatabaseConfigProvider) extends ClientDAO {

  val dbConfig: DatabaseConfig[JdbcProfile] = dbConfigProvider.get[JdbcProfile]
  val db: JdbcBackend#DatabaseDef = dbConfig.db

  import dbConfig.driver.api._

  override def findAll() = {
    db.run(clients.result).map { row =>
      row.map {
        client =>
          Client(
            client.id,
            client.firstName,
            client.lastName,
            client.email,
            client.comment,
            client.searchSince,
            client.surfaceMin,
            client.roomsMin,
            client.maxPrice,
            client.interestZones,
            client.createdAt,
            client.updatedAt
          )
      }
    }
  }

  override def findWithMaxPrice(maxPrice: BigDecimal) = {
    val clientQuery = clients.filter(_.maxPrice < maxPrice)

    db.run(clientQuery.result).map { row =>
      row.map {
        client =>
          Client(
            client.id,
            client.firstName,
            client.lastName,
            client.email,
            client.comment,
            client.searchSince,
            client.surfaceMin,
            client.roomsMin,
            client.maxPrice,
            client.interestZones,
            client.createdAt,
            client.updatedAt
          )
      }
    }
  }

  def find(clientId: Int) = {
    {
      val clientQuery = clients.filter(_.id === clientId)
      db.run(clientQuery.result.headOption).map { resultOption =>
        resultOption.map {
          client =>
            Client(
              client.id,
              client.firstName,
              client.lastName,
              client.email,
              client.comment,
              client.searchSince,
              client.surfaceMin,
              client.roomsMin,
              client.maxPrice,
              client.interestZones,
              client.createdAt,
              client.updatedAt
            )
        }
      }
    }
  }

  override def save(client: Client) = {
    val dbClient = client.id match {
      case Some(i) => DbClient(client.id, client.firstName, client.lastName, client.email, client.comment, client.searchSince, client.surfaceMin, client.roomsMin,
        client.maxPrice, client.interestZones, client.createadAt, Some(new Date()))
      case None => DbClient(client.id, client.firstName, client.lastName, client.email, client.comment, client.searchSince, client.surfaceMin, client.roomsMin,
        client.maxPrice, client.interestZones, Some(new Date()), Some(new Date()))
    }
    try {
      db.run(clients.insertOrUpdate(dbClient)).map(_ => Some(client))
    } catch {

      case _: Throwable => {
        Logger.logger.error("error")
        Future.successful(Some(client))
      }
    }
  }

  override def remove(clientId: Int) = {
    db.run(clients.filter(_.id === clientId).delete)
  }
}

/**
 * The companion object.
 */
object ClientDAOImpl {

  private val clients = TableQuery[ClientTable]
}
