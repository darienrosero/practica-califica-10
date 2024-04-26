import express from 'express'
import { uprole, catchErr, showPicture } from './controller.js'
import { PORT } from './config/config.js'
import { filerole } from './config/multer.js'
const app = express()

// url para subir imagen
app.post('/uprole', filerole.single('profile'), uprole)

// mostrar imagen
app.get('/files/:nombreArchivo', showPicture)

// captura el erro de multer
app.use(catchErr)

app.listen(PORT, () => console.log(`server runnig on http://localhost: ${PORT}`))
