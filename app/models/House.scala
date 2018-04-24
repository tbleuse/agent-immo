package models

import java.util.Date

import play.api.libs.json.Json

case class House(
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

object House {
  implicit val houseWrites = Json.writes[House]
  implicit val houseReads = Json.reads[House]
}