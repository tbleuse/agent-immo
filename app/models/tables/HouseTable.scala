package models.tables

import java.util.Date

import slick.driver.PostgresDriver.api._
import slick.lifted.ProvenShape

case class DbHouse(
  id: Option[Int],
  address: Option[String],
  postCode: Option[String],
  town: Option[String],
  country: Option[String],
  surface: Option[BigDecimal],
  rooms: Option[Int],
  price: Option[BigDecimal],
  negociation: Option[Boolean],
  comment: Option[String],
  toSellSince: Option[Date],
  createadAt: Option[Date],
  updatedAt: Option[Date])

class HouseTable(tag: Tag) extends Table[DbHouse](tag, "houses") {
  implicit val JavaUtilDateMapper =
    MappedColumnType.base[java.util.Date, java.sql.Timestamp](
      d => new java.sql.Timestamp(d.getTime),
      d => new java.util.Date(d.getTime))

  def id: Rep[Option[Int]] = column[Option[Int]]("id", O.PrimaryKey, O.AutoInc)

  def address: Rep[Option[String]] = column[Option[String]]("address")

  def postCode: Rep[Option[String]] = column[Option[String]]("post_code")

  def town: Rep[Option[String]] = column[Option[String]]("town")

  def country: Rep[Option[String]] = column[Option[String]]("country")

  def surface: Rep[Option[BigDecimal]] = column[Option[BigDecimal]]("surface")

  def rooms: Rep[Option[Int]] = column[Option[Int]]("rooms")

  def price: Rep[Option[BigDecimal]] = column[Option[BigDecimal]]("price")

  def negociation: Rep[Option[Boolean]] = column[Option[Boolean]]("negociation")

  def comment: Rep[Option[String]] = column[Option[String]]("comment")

  def toSellSince: Rep[Option[Date]] = column[Option[Date]]("to_sell_since")

  def createdAt: Rep[Option[Date]] = column[Option[Date]]("created_at")

  def updatedAt: Rep[Option[Date]] = column[Option[Date]]("updated_at")

  override def * : ProvenShape[DbHouse] = (id, address, postCode, town, country, surface,
    rooms, price, negociation, comment, toSellSince,
    createdAt, updatedAt) <> (DbHouse.tupled, DbHouse.unapply)

}

