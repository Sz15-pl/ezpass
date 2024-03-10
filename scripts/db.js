const sqlite3 = require('sqlite3');
const base_datos = new sqlite3.Database('./db/usuarios.db');

function añadir(identificacion, nombre, apellidos, foto, fechaSubscripcion, callback) {
    try {
        base_datos.run("CREATE TABLE IF NOT EXISTS usuarios (identificacion TEXT, nombre TEXT, apellidos TEXT, foto BLOB, fechaSubscripcion DATE)");

        // Comprobamos si el usuario ya existe
        consultar(identificacion, (err, existingUser) => {
            if (err) {
                console.error('Error al consultar usuario:', err);
                callback(err, null);
            } else {
                // Si el usuario ya existe, enviamos un error en el callback
                if (existingUser.length > 0) {
                    const errorMessage = 'El usuario ya existe';
                    console.error(errorMessage);
                    callback(new Error(errorMessage), null);
                } else {
                    // Si el usuario no existe, procedemos con la inserción
                    var stmt = base_datos.prepare("INSERT INTO usuarios VALUES (?,?,?,?,?)");
                    stmt.run(identificacion, nombre, apellidos, foto, fechaSubscripcion);
                    stmt.finalize();

                    base_datos.all("SELECT * FROM usuarios", (err, rows) => {
                        if (err) {
                            console.error('Error en añadir:', err);
                            callback(err, null);
                        } else {
                            callback(null, rows);
                        }
                    });
                }
            }
        });
    } catch (error) {
        console.error('Error en añadir:', error);
        callback(error, null);
    }
}

function eliminar(identificacion, callback) {
    try {
        base_datos.run("CREATE TABLE IF NOT EXISTS usuarios (identificacion TEXT, nombre TEXT, apellidos TEXT, foto BLOB, fechaSubscripcion DATE)");
        var stmt = base_datos.prepare("DELETE FROM usuarios WHERE identificacion = ?");
        stmt.run(identificacion);
        stmt.finalize();

        base_datos.all("SELECT * FROM usuarios", (err, rows) => {
            if (err) {
                console.error('Error en eliminar:', err);
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    } catch (error) {
        console.error('Error en eliminar:', error);
        callback(error, null);
    }
}

function consultar(identificacion, callback) {
    try {
        base_datos.run("CREATE TABLE IF NOT EXISTS usuarios (identificacion TEXT, nombre TEXT, apellidos TEXT, foto BLOB, fechaSubscripcion DATE)");

        base_datos.all("SELECT * FROM usuarios WHERE identificacion = ?", [identificacion], (err, rows) => {
            if (err) {
                console.error('Error en consultar:', err);
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    } catch (error) {
        console.error('Error en consultar:', error);
        callback(error, null);
    }
}

function actualizar(identificacion, nuevaFecha, callback) {
    try {
        base_datos.run("CREATE TABLE IF NOT EXISTS usuarios (identificacion TEXT, nombre TEXT, apellidos TEXT, foto BLOB, fechaSubscripcion DATE)");


        consultar(identificacion, (err, existingUser) => {
            if (err) {
                console.error('Error al consultar usuario:', err);
                callback(err, null);
            } else {
                if (existingUser.length > 0) {
                    var stmt = base_datos.prepare("UPDATE usuarios SET fechaSubscripcion = ? WHERE identificacion = ?");
                    stmt.run(nuevaFecha, identificacion);
                    stmt.finalize();
                } else {


                    console.error("El usuario no existe");
                    callback(new Error("El usuario no existe"), null);
                }

                base_datos.all("SELECT * FROM usuarios", (err, rows) => {
                    if (err) {
                        console.error('Error en actualizar fecha de subscripción:', err);
                        callback(err, null);
                    } else {
                        callback(null, rows);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error en actualizar fecha de subscripción:', error);
        callback(error, null);
    }
}
function consultaGeneral(callback) {
    try {
        base_datos.all("SELECT * FROM usuarios", (err, rows) => {
            if (err) {
                console.error('Error en la consulta general:', err);
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    } catch (error) {
        console.error('Error en la consulta general:', error);
        callback(error, null);
    }
}


module.exports = {
    añadir,
    eliminar,
    consultar,
    actualizar,
    consultaGeneral
};