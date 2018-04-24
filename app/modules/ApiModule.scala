package modules

import com.google.inject.AbstractModule
import models.daos.{ ClientDAO, ClientDAOImpl, HouseDAO, HouseDAOImpl }
import models.services.{ ClientService, ClientServiceImpl, HouseService, HouseServiceImpl }
import net.codingwell.scalaguice.ScalaModule

class ApiModule extends AbstractModule with ScalaModule {

  def configure(): Unit = {
    bind[ClientService].to[ClientServiceImpl]
    bind[ClientDAO].to[ClientDAOImpl]
    bind[HouseService].to[HouseServiceImpl]
    bind[HouseDAO].to[HouseDAOImpl]
  }

}
