import multer from 'multer'
import { pool } from './db.js'

// funcion pra almacenar archivos
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './profiles')
  },
  // agregar fecha a los archivos subidos
  filename: async function (req, file, cb) {
    const nombreArchivo = `${Date.now()}-${file.originalname}`
    cb(null, nombreArchivo)

    // agregar nombre a la BD
    try {
      await pool.execute('INSERT INTO usuarios(profile_picture) VALUES (?)', [nombreArchivo])
    } catch (error) {
      Error('hubo un error al subir el archivo')
    }
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
