import express from 'express'
import { uprole, catchErr } from './controller.js'
import { PORT } from './config/config.js'
import { filerole } from './config/multer.js'
const app = express()

// url para subir imagen
app.post('/uprole', filerole.single('profile'), uprole)

// captura el erro de multer
app.use(catchErr)

app.listen(PORT, () => console.log(`server runnig on http://localhost: ${4000}`))
