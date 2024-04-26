import path from 'node:path'

export const uprole = async (req, res) => {
  res.json({ message: 'imagen subida' })
}

export const catchErr = (err, req, res, next) => {
  if (err.message) {
    return res.status(400).json({ message: err.message })
  } else {
    return res.status(500).json({ message: 'huvo un error interno' })
  }
}

export const showPicture = (req, res) => {
  try {
    const { nombreArchivo } = req.params
    if (!nombreArchivo) {
      return res.status(500).json({ message: 'el archivo no tiene nombre' })
    }

    const rutaImagen = path.resolve(`./profiles/${nombreArchivo}`)
    res.sendFile(rutaImagen)
  } catch (error) {
    return res.status(500).json({ message: 'la imagen no se pudo mostrar' })
  }
}
