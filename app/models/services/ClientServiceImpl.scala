package models.services

import javax.inject.Inject

import models.Client
import models.daos.ClientDAO

class ClientServiceImpl @Inject() (clientDAO: ClientDAO) extends ClientService {

  override def retrieveAll() = clientDAO.findAll()

  override def retriveWithMaxPrice(maxPrice: BigDecimal) = clientDAO.findWithMaxPrice(maxPrice)

  override def retrieve(clientId: Int) = clientDAO.find(clientId)

  override def save(client: Client) = clientDAO.save(client)
}
