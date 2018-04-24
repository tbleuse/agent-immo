package models

import java.util.Date

import play.api.libs.json.{ JsValue, Json }

case class Client(
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
  createadAt: Option[Date],
  updatedAt: Option[Date])

object Client {
  implicit val clientWrites = Json.writes[Client]
  implicit val clientReads = Json.reads[Client]
}
