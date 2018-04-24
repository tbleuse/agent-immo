package models.daos

import models.Client

import scala.concurrent.Future

trait ClientDAO {

  def findAll(): Future[Seq[Client]]

  def findWithMaxPrice(maxPrice: BigDecimal): Future[Seq[Client]]

  def find(clientId: Int): Future[Option[Client]]

  def save(client: Client): Future[Option[Client]]

  def remove(clientId: Int): Future[Int]
}
