const { app, BrowserWindow } = require('electron');

let mainWindow;
let splash;

app.on('ready', () => {
    // Create the splash screen
    splash = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false, // Remove window frame
        alwaysOnTop: true, // Keep the splash screen on top
        transparent: true, // Transparent background
    });
    splash.setMenu(null); // Remove menu
    splash.loadFile('splash.html'); // Load your splash screen file

    // Create the main window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false, // Do not show the main window until it's ready
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.setMenu(null); // Remove menu
    mainWindow.loadFile('index.html');

    // Wait for the main window to finish loading
    mainWindow.webContents.once('did-finish-load', () => {
        // Close the splash screen
        splash.close();

        // Show the main window
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
