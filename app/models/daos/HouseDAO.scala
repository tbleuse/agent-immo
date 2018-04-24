package models.daos

import models.House

import scala.concurrent.Future

trait HouseDAO {

  def findAll(): Future[Seq[House]]

  def findWithMaxPrice(maxPrice: BigDecimal): Future[Seq[House]]

  def find(houseId: Int): Future[Option[House]]

  def save(house: House): Future[Option[House]]

  def remove(houseId: Int): Future[Int]
}
