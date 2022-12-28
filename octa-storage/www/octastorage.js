// cordova plugin rm octa-storage

// cordova plugin add --link C:\Users\User\Desktop\Projects\Ionic\WriteFile\octa-storage
// cordova plugin add --link /home/rootadmin/Desktop/ionic/writefilee/octa-storage

// npm i C:\Users\User\Desktop\Projects\Ionic\WriteFile\octa-storage ;npx cap sync

const className = 'OctaStorage';

module.exports = {
    request(successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, className, 'request', []);
    },
    write(name, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, className, 'write', [name]);
    },
    read(name, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, className, 'read', [name]);
    }
}