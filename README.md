# ItaipuBarcodeScanner
A Barcode Scanner that can read several types of barcodes using a smart phone with a camera. It takes a picture of the Barcode and then decodes from the image. It's used at Itaipu DAM besides other software solution to identify informations about some machines using only a barcode tag and a scanner.

Inside the [release](release/) folder is the last version of the ItaipuBarcodeScanner Windows 8.1 app. It's a .zip file with the powerShell script to install the app.

This versions of the app doesn't have an user interface, because it's used to communicate with a JAVA aplication through a socket. So, when the app starts the camera is also started to take pictures and then the result is sent to socket communication. Using the [BarcodeScannerSocket](https://github.com/thiagobitencourt/BarcodeScannerSocket) prototype you can launch the BarcodeScannerApp (need to be installed), take a picture of the barcode and then show the decoded info.

We are using Grunt.js Task Runner only to generate the release pack and send it to a http server. A http server is used to serve the BarcodeScannerApp.zip file used by an instalation script that installs or update for the last version of this App. 

To know more about this project, please go to our wiki page at [wiki.celtab.org.br](http://wiki.celtab.org.br/index.php/Itaipu_BarcodeScanner) (Portuguese only).

The core for the barcode scanner is based on [zbarjs](https://github.com/yurydelendik/zbarjs) project.

This project was made using the [Apache Cordova](http://cordova.apache.org/) platform, so it is possible to recompile it and use it into several mobile platforms. It was already tested on android and Windows 8.1.
