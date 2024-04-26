import express from 'express'
import multer from 'multer'
import { uprole } from './controller.js'
import { PORT } from './config.js'

const app = express()

// funcion pra almacenar archivos
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './profiles')
  },
  // agregar fecha a los archivos subidos
  filename: function (req, file, cb) {
    const date = Date.now()
    cb(null, `${date}-${file.originalname}`)
  }

})
// filtra archivoa
const fileFilter = (req, file, cb) => {
  const permitidos = ['image/jpeg', 'image/png']
  if (permitidos.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('solo se permiten imagenes'), false)
  }
}

const filerole = multer({ storage, fileFilter })

// url para subir imagen
app.post('/uprole', filerole.single('profile'), uprole)

// captura el erro de multer
app.use((err, req, res, next) => {
  if (err.message) {
    return res.status(400).json({ message: err.message })
  } else {
    return res.status(500).json({ message: 'huvo un error interno' })
  }
})

app.listen(PORT, () => console.log(`server runnig on http://localhost: ${4000}`))
