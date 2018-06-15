const errores = {
  "US": {
    "ErrorCliente": {
      "error": true,
      "trace": "- Incorrect request - Try to verify if the action has the correct syntax.",
      "status": 400
    },
    "UnauthorizedError": {
      "error": true,
      "trace": "Invalid token...",
      "status": 401
    },
    "ErrorMediaTipo": {
      "error": true,
      "trace": "ERROR: The type of the file uploaded is not compatible.",
      "status": 415
    },
    "NoTokenNoCollection": {
      "error": true,
      "trace": "Something is wrong, your token expires, or the collection does not exist.",
      "status": 420
    },
    "ErrorServer": {
      "error": true,
      "trace": "ERROR: The server failed.",
      "status": 500
    },
    "BadJSON": {
      "error": true,
      "trace": "ERROR: JSON not compatible.",
      "status": 666
    },
    "InUseNick": {
      "error": true,
      "trace": "ERROR: Nick not available.",
      "status": 666
    },
    "InUseMail": {
      "error": true,
      "trace": "ERROR: The email entered corresponds to a user.",
      "status": 666
    }
  },
  "ES": {
    "ErrorCliente": {
      "error": true,
      "trace": "-Solicitud incorrecta- Intenta verificar si la accion tiene la sintaxis correcta.",
      "status": 400
    },
    "UnauthorizedError": {
      "error": true,
      "trace": "Token invalido...",
      "status": 401
    },
    "ErrorMediaTipo": {
      "error": true,
      "trace": "ERROR: El tipo del archivo subido, no es compatible.",
      "status": 415
    },
    "NoTokenNoCollection": {
      "error": true,
      "trace": "Algo anda mal, expiro su token, o la colleccion no existe.",
      "status": 420
    },
    "ErrorServer": {
      "error": true,
      "trace": "ERROR: El servidor fallo.",
      "status": 500
    },
    "BadJSON": {
      "error": true,
      "trace": "ERROR: JSON no compatible.",
      "status": 666
    },
    "InUseNick": {
      "error": true,
      "trace": "ERROR: Nick no disponible.",
      "status": 666
    },
    "InUseMail": {
      "error": true,
      "trace": "ERROR: El email ingresado corresponde a un usuario.",
      "status": 666
    }
  }
}
module.exports = errores