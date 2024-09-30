// Serve the production build from the dist folder
// - no need to use during development!
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

const PORT = 5905;
const distFolderPath = path.join( __dirname, '..', 'dist' );
const indexHtmlPath = path.join( distFolderPath, 'index.html' );

// start an express server
const app = express();
// serve the dist folder
app.use( express.static( distFolderPath ) );
// serve the index file on all unresolved paths
app.get( '*', ( _req, res ) => {
  res.sendFile( indexHtmlPath );
} );
app.listen( PORT, () => console.log( 'Listening on http://localhost:' + PORT ) );
