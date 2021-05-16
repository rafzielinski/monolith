import { Application } from "stimulus"

import AppController from "./controllers/app_controller"

const application = Application.start()
application.register("app", AppController)
