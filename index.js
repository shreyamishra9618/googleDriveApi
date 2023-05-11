const { google } = require('googleapis');
const http = require('http');
const url = require('url');
const open = require('open');
const PORT = 3000;
const auth = new google.auth.OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    `http://localhost:${PORT}/auth/google/callback`
);
const drive = google.drive({ version: 'v3', auth });

// Set up a server to handle OAuth2 callbacks
const server = http.createServer(async (req, res) => {
    if (req.url.indexOf('/auth/google/callback') > -1) {
        const qs = url.parse(req.url, true).query;
        const { tokens } = await auth.getToken(qs.code);
        auth.setCredentials(tokens);
        res.end('Authentication successful! You can close this tab and return to the app.');
    }
});

// List files in user's Drive account
async function listFiles() {
    const { data } = await drive.files.list({
        q: "'root' in parents and trashed = false",
        fields: 'nextPageToken, files(id, name)',
    });
    const files = data.files;
    if (files.length) {
        console.log('Files:');
        files.forEach(file => {
            console.log(`${file.name} (${file.id})`);
        });
    } else {
        console.log('No files found.');
    }
}

// Download file by ID
async function downloadFile(fileId, destPath) {
    const { data } = await drive.files.get({
        fileId: fileId,
        alt: 'media',
    }, { responseType: 'stream' });
    const destFile = fs.createWriteStream(destPath);
    data.on('error', err => {
        console.log('Error downloading file: ' + err);
    }).on('end', () => {
        console.log('File downloaded.');
    }).pipe(destFile);
}

// List users who have access to a file
async function listUsers(fileId) {
    const { data } = await drive.permissions.list({
        fileId: fileId,
        fields: 'permissions(id, emailAddress, role)',
    });
    const users = data.permissions;
    if (users.length) {
        console.log('Users:');
        users.forEach(user => {
            console.log(`${user.emailAddress} (${user.role})`);
        });
    } else {
        console.log('No users found.');
    }
}

// Set up real-time notifications using Push Notifications
async function watchFile(fileId) {
    const { data } = await drive.files.watch({
        fileId: fileId,
        requestBody: {
            id: 'unique-id-here',
            type: 'web_hook',
            address: 'https://your-app-url.com/notifications',
        },
    });
    console.log(`Watching file ${fileId} for changes.`);
    console.log(`Webhook URL: ${data.resourceUri}`);
}

// Start the server and open the OAuth2 login page in the user's default browser
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
    const authUrl = auth.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/drive'],
    });
    open(authUrl);
});

// Export the functions for use in other modules
module.exports = {
    listFiles: listFiles,
    downloadFile: downloadFile,
    listUsers: listUsers,
    watchFile: watchFile,
};
