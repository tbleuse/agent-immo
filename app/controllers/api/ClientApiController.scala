package controllers.api

import javax.inject.Inject

import models.Client
import models.services.ClientService
import play.api.libs.json.{ JsSuccess, Json }
import play.api.mvc.{ Action, AnyContent, Controller }

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClientApiController @Inject() (
  clientService: ClientService
) extends Controller {

  def getAll: Action[AnyContent] = Action.async { implicit request =>
    clientService.retrieveAll().map { clients =>
      Ok(Json.toJson(clients))
    }
  }

  def get(id: Int): Action[AnyContent] = Action.async { implicit request =>
    clientService.retrieve(id).map { client =>
      Ok(Json.toJson(client))
    }
  }

  def update(id: Int): Action[AnyContent] = Action.async { implicit request =>
    request.body.asJson match {
      case Some(json) => {
        Client.clientReads.reads(json) match {
          case JsSuccess(client, _) => clientService.save(client).map { savedClient =>
            Ok(Json.toJson(savedClient))
          }
          case _ => Future.successful(BadRequest("bad body"))
        }
      }
      case None => Future.successful(BadRequest("bad body"))
    }
  }

  def create: Action[AnyContent] = Action.async { implicit request =>
    request.body.asJson match {
      case Some(json) => {
        Client.clientReads.reads(json) match {
          case JsSuccess(client, _) => clientService.save(client).map { savedClient =>
            Ok(Json.toJson(savedClient))
          }
          case _ => Future.successful(BadRequest("bad body"))
        }
      }
      case None => Future.successful(BadRequest("bad body"))
    }
  }

  def createZone(): Action[AnyContent] = Action.async { implicit request =>
    {
      request.body.asJson match {
        case Some(json) => {
          val client = clientService.retrieve((json \ "clientId").get.as[Int])
          Future.successful(BadRequest("bad body"))
        }
        case None => Future.successful(BadRequest("bad body"))

      }
    }
  }
}
