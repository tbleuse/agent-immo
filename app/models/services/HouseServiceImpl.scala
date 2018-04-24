package models.services

import javax.inject.Inject

import models.House
import models.daos.HouseDAO

class HouseServiceImpl @Inject() (houseDAO: HouseDAO) extends HouseService {
  override def retrieveAll() = houseDAO.findAll()

  override def retriveWithMaxPrice(maxPrice: BigDecimal) = houseDAO.findWithMaxPrice(maxPrice)

  override def retrieve(houseId: Int) = houseDAO.find(houseId)

  override def save(house: House) = houseDAO.save(house)
}
