package models.services

import models.House

import scala.concurrent.Future

trait HouseService {

  def retrieveAll(): Future[Seq[House]]

  def retriveWithMaxPrice(maxPrice: BigDecimal): Future[Seq[House]]

  def retrieve(houseId: Int): Future[Option[House]]

  def save(house: House): Future[Option[House]]

}
