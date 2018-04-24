package controllers.api

import javax.inject.Inject

import models.House
import models.services.HouseService
import play.api.libs.json.{ JsSuccess, Json }
import play.api.mvc.{ Action, AnyContent, Controller }

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class HouseApiController @Inject() (houseService: HouseService) extends Controller {

  def getAll: Action[AnyContent] = Action.async { implicit request =>
    houseService.retrieveAll().map { houses =>
      Ok(Json.toJson(houses))
    }
  }

  def get(id: Int): Action[AnyContent] = Action.async { implicit request =>
    houseService.retrieve(id).map { house =>
      Ok(Json.toJson(house))
    }
  }

  def create: Action[AnyContent] = Action.async { implicit request =>
    request.body.asJson match {
      case Some(json) => {
        House.houseReads.reads(json) match {
          case JsSuccess(client, _) => houseService.save(client).map { savedClient =>
            Ok(Json.toJson(savedClient))
          }
          case _ => Future.successful(BadRequest("bad body"))
        }
      }
      case None => Future.successful(BadRequest("bad body"))
    }
  }

}
