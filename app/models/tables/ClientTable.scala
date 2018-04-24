package models.tables

import java.util.Date

import play.api.libs.json.JsValue
import slick.driver.PostgresDriver.api._
import slick.lifted.ProvenShape

case class DbClient(
  id: Option[Int],
  firstName: Option[String],
  lastName: Option[String],
  email: Option[String],
  comment: Option[String],
  searchSince: Option[Date],
  surfaceMin: Option[BigDecimal],
  roomsMin: Option[Int],
  maxPrice: Option[BigDecimal],
  interestZones: Option[String],
  createdAt: Option[Date],
  updatedAt: Option[Date])

class ClientTable(tag: Tag) extends Table[DbClient](tag, "clients") {
  implicit val JavaUtilDateMapper =
    MappedColumnType.base[java.util.Date, java.sql.Timestamp](
      d => new java.sql.Timestamp(d.getTime),
      d => new java.util.Date(d.getTime))

  def id: Rep[Option[Int]] = column[Option[Int]]("id", O.PrimaryKey, O.AutoInc)

  def firstName: Rep[Option[String]] = column[Option[String]]("first_name")

  def lastName: Rep[Option[String]] = column[Option[String]]("last_name")

  def email: Rep[Option[String]] = column[Option[String]]("email")

  def comment: Rep[Option[String]] = column[Option[String]]("comment")

  def searchSince: Rep[Option[Date]] = column[Option[Date]]("search_since")

  def surfaceMin: Rep[Option[BigDecimal]] = column[Option[BigDecimal]]("surface_min")

  def roomsMin: Rep[Option[Int]] = column[Option[Int]]("rooms_min")

  def maxPrice: Rep[Option[BigDecimal]] = column[Option[BigDecimal]]("max_price")

  def interestZones: Rep[Option[String]] = column[Option[String]]("interest_zones")

  def createdAt: Rep[Option[Date]] = column[Option[Date]]("created_at")

  def updatedAt: Rep[Option[Date]] = column[Option[Date]]("updated_at")

  override def * : ProvenShape[DbClient] = (id, firstName,
    lastName, email, comment, searchSince, surfaceMin,
    roomsMin, maxPrice, interestZones, createdAt, updatedAt) <> (DbClient.tupled, DbClient.unapply)

}
