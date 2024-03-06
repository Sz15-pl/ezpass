
# EzPass

Aplicacion Web desarrollada en Node.Js con la libreria Socket.io para la transmision de archivos fácilmente. Esta manera de transferir archivos es mucho más eficiente, y a la par mas barata debido al ahorro de recursos por parte del servidor. Ya que este solamente recibe unos datos y luego los envía. Actualmente el límite son 20 Mb por archivo.


## ¿Cómo funciona?

Envia el archivo mediante Websockets.

```http
  ws://(tusitio)
```

| Parametros | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Requerido**. Id del cliente |
| `nombre`  | `string` | **Requerido**. Nombre del archivo |
 `archivo`  | `string` | **Requerido**. Archivo a transferir convertido a b64 |

## Ejemplo

![](https://github.com/s-pl/ezpass/blob/main/g.gif)

