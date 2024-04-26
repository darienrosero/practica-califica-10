import multer from 'multer'

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

export const filerole = multer({ storage, fileFilter })
