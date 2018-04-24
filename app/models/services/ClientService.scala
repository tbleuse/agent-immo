package models.services

import models.Client

import scala.concurrent.Future

trait ClientService {

  def retrieveAll(): Future[Seq[Client]]

  def retriveWithMaxPrice(maxPrice: BigDecimal): Future[Seq[Client]]

  def retrieve(clientId: Int): Future[Option[Client]]

  def save(client: Client): Future[Option[Client]]

}
