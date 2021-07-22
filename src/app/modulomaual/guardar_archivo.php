<?php 
/* guardar_archivo.php */
require("conexion.php");
$con=retornarConexion();

$archivo = $_FILES["archivito"]["tmp_name"]; 
$tamanio = $_FILES["archivito"]["size"];
$tipo    = $_FILES["archivito"]["type"];
$nombre  = $_FILES["archivito"]["name"];
$titulo  = $_POST["titulo"];

if ( $archivo != "none" )
{
   $fp = fopen($archivo, "rb");
   $contenido = fread($fp, $tamanio);
   $contenido = addslashes($contenido);
   fclose($fp); 

   $qry = "INSERT INTO archivos VALUES 
           (0,'$nombre','$titulo','$contenido','$tipo')";

mysqli_query($con,$qry);

   if(mysqli_fetch_array($conn) > 0)
      print "Se ha guardado el archivo en la base de datos.";
   else
      print "NO se ha podido guardar el archivo en la base de datos.";
}
else
   print "No se ha podido subir el archivo al servidor";
   ?>