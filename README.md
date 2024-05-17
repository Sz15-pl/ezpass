
# EzPass

Aplicacion Web desarrollada en Node.Js con la libreria Socket.io para la transmision de archivos fácilmente. Actualmente el límite son 20 Mb por archivo.


## ¿Cómo funciona?

Envia archivos entre dispositivos gracias a [Socket.io](https://socket.io/).


| Parametros | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Requerido**. Id del cliente |
| `nombre`  | `string` | **Requerido**. Nombre del archivo |
 `archivo`  | `string` | **Requerido**. Archivo a transferir convertido a b64 |
  `token`  | `string` | **Requerido**. Token proporcionado al iniciar sesión |

## Pruebalo aquí
[Render](https://ezpass.onrender.com)


