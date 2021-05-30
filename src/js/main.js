import { Application } from "stimulus"

import InputController from "./controllers/input_controller"

const application = Application.start()
application.register("input", InputController)
