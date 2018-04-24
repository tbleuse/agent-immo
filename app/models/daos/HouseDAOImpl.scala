package models.daos
import java.util.Date
import javax.inject.Inject

import models.House
import models.daos.ClientDAOImpl.clients
import models.daos.HouseDAOImpl._
import models.tables.{ DbClient, DbHouse, HouseTable }
import play.api.Logger
import play.api.db.slick.DatabaseConfigProvider
import slick.backend.DatabaseConfig
import slick.driver.JdbcProfile
import slick.jdbc.JdbcBackend
import slick.lifted.TableQuery

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class HouseDAOImpl @Inject() (protected val dbConfigProvider: DatabaseConfigProvider) extends HouseDAO {

  val dbConfig: DatabaseConfig[JdbcProfile] = dbConfigProvider.get[JdbcProfile]
  val db: JdbcBackend#DatabaseDef = dbConfig.db

  import dbConfig.driver.api._

  override def findAll() = {
    db.run(houses.result).map { row =>
      row.map {
        house =>
          House(
            house.id,
            house.address,
            house.postCode,
            house.town,
            house.country,
            house.surface,
            house.rooms,
            house.price,
            house.negociation,
            house.comment,
            house.toSellSince,
            house.createadAt,
            house.updatedAt)
      }
    }
  }

  override def findWithMaxPrice(maxPrice: BigDecimal) = {
    db.run(houses.filter(_.price < maxPrice).result).map { row =>
      row.map {
        house =>
          House(
            house.id,
            house.address,
            house.postCode,
            house.town,
            house.country,
            house.surface,
            house.rooms,
            house.price,
            house.negociation,
            house.comment,
            house.toSellSince,
            house.createadAt,
            house.updatedAt)
      }
    }
  }

  override def find(houseId: Int) = {
    db.run(houses.filter(_.id === houseId).result.headOption).map { row =>
      row.map {
        house =>
          House(
            house.id,
            house.address,
            house.postCode,
            house.town,
            house.country,
            house.surface,
            house.rooms,
            house.price,
            house.negociation,
            house.comment,
            house.toSellSince,
            house.createadAt,
            house.updatedAt)
      }
    }
  }

  override def save(house: House) = {
    val dbHouse = house.id match {
      case Some(i) => DbHouse(house.id, house.address, house.postCode, house.town, Some("France"), house.surface, house.rooms,
        house.price, house.negociation, house.comment, house.toSellSince, house.createadAt, Some(new Date()))
      case None => DbHouse(house.id, house.address, house.postCode, house.town, Some("France"), house.surface, house.rooms,
        house.price, house.negociation, house.comment, house.toSellSince, Some(new Date()), Some(new Date()))
    }
    try {
      db.run(houses.insertOrUpdate(dbHouse)).map(_ => Some(house))
    } catch {

      case _: Throwable => {
        Logger.logger.error("error")
        Future.successful(Some(house))
      }
    }
  }

  override def remove(houseId: Int) = {
    db.run(houses.filter(_.id === houseId).delete)
  }
}

/**
 * The companion object.
 */
object HouseDAOImpl {
  private val houses = TableQuery[HouseTable]
}