export const uprole = async (req, res) => {
  res.send('imagen subida')
}

export const catchErr = (err, req, res, next) => {
  if (err.message) {
    return res.status(400).json({ message: err.message })
  } else {
    return res.status(500).json({ message: 'huvo un error interno' })
  }
}
