import { Storage } from '@ionic/storage';

declare let cordova: any
declare let device: any
declare let OctaStorage: any

type readFileCallback = (result: string | ArrayBuffer | null) => void;
type errorFileCallback = (error: any) => void;
const placeHolderFunction: errorFileCallback = e => undefined;
const isCap = 'Capacitor' in window;
// @ts-ignore /////
const isAndroid = false ?? (isCap ? window['Capacitor'] : device).platform.match(/android/i);

function sampleBlobFromVariable(data: any): Blob {
	const isBlob = data instanceof Blob;

	if (isBlob) return data;
	let blobpart: string = data + '';

	if (data instanceof Object) blobpart = JSON.stringify(data);


	return new Blob([blobpart], { type: 'text/plain' });
}

export class OctaFileManager {

	constructor(public name: string) { }

	private requestFileSystem(successCallback: (entry: any) => void, onError?: Function) {
		if (isAndroid) {
			// @ts-ignore
			return window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, successCallback, onError);
		}

		// @ts-ignore
		return window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, ({ root }) => successCallback(root), onError);
	}
	write(data: any, success: Function = placeHolderFunction, error: errorFileCallback = placeHolderFunction) {
		const blob = sampleBlobFromVariable(data);

		this.requestFileSystem(fs =>
			// @ts-ignore
			fs.getFile(this.name, { create: true, exclusive: false }, fileEntry =>
				// @ts-ignore
				fileEntry.createWriter(fileWriter => {
					
					
					// @ts-ignore
					fileWriter.onerror = e => error(e);
					fileWriter.onwrite = () => success();					

					fileWriter.write(blob);
				}), error), error)
	}
	read(success: readFileCallback, error: errorFileCallback = placeHolderFunction) {

		this.requestFileSystem(fs =>
			// @ts-ignore
			fs.getFile(this.name, {}, fileEntry =>
				// @ts-ignore
				fileEntry.file(file => {
					const reader = new FileReader();

					if (isCap) { // @ts-ignore
						reader.__zone_symbol__originalInstance.onloadend = () => success(reader._result);
					} else {
						reader.onloadend = () => success(reader.result);
					}

					// TODO: Fix `argument 0 is not a type of Blob`;
					reader.readAsText(file);

				}, error), error), error);
	}

}

export class OctaPersistentStorage {
	private hasPermission = true;
	private shouldBeOnlyReloaded = true;
	manager = new OctaFileManager(this.name);
	sessionData = {}
	private storage = new Storage();
	private ready: Promise<boolean>;

	constructor(private name: string, public onNeedsPermission?: (request: Function) => void) {
		let resolve: Function;
		let reject: Function;
		this.ready = new Promise((_resolve, _reject) => {
			resolve = _resolve;
			reject = _reject;
		});
		// this.reload().then(() => resolve()); /////
		
		this.storage.create();
	}

	private lsGet(key: string) {
		return this.storage.get(this.name + '/' + key);
	}
	private lsSet(key: string, value: string) {
		return this.storage.set(this.name + '/' + key, value);
	}
	private reload() {
		return new Promise((resolve, reject) => 
			this.manager.read(
				async (value) => { 					
					if (value === null) {
						this.hasPermission = false;						
						reject(false);
						return;
					}

					this.hasPermission = true;
					// @ts-ignore
					this.sessionData = JSON.parse(value);
					
				
					if (await this.lsGet('__initialized__')) {
						for (const key in this.sessionData) {
							// @ts-ignore
							const value = this.sessionData[key];
							const lsvalue = await this.lsGet(key);
							
							if (typeof value === 'object') {
								if (JSON.stringify(value) == JSON.stringify(lsvalue)) continue;
							} else {
								if (value == lsvalue) continue;
							}
	
							// @ts-ignore
							this.sessionData[key] = lsvalue;
						}
					} else {
						await this.lsSet('__initialized__', '1');

						for (const key in this.sessionData) {
							// @ts-ignore
							const value = this.sessionData[key];
							
							await this.lsSet(key, value);
						}
					}					
					resolve(value);
				},
				e => {
					if (e.code == 1) return; // Path not found; storage is either new or deleted by user.
					
					
					reject(e);
					console.group('Error happened while loading storage: ' + this.name);
					console.error(e);
					console.groupEnd();
				}))
	}
	private async checkPermission() {	
		await this.ready;

		if (this.shouldBeOnlyReloaded) {
			this.shouldBeOnlyReloaded = false;
			
			try {				
				await this.reload();
				return false;
			} catch (error) {}
		}
		
		if (this.hasPermission) return false;
		this.shouldBeOnlyReloaded = true;
		
		if (this.onNeedsPermission) {
			this.onNeedsPermission(OctaStorage.request);
		} else {
			OctaStorage.request();
		}
		return true;
	}
	private update() {
		return new Promise((resolve, reject) => 
			this.manager.write(this.sessionData, resolve, reject));
	}
	async set(key: string, value: any) {
		this.lsSet(key, value);
		return;
		if (await this.checkPermission()) return;

		// @ts-ignore
		this.sessionData[key] = value;
		this.lsSet(key, value);
		
		try {
			await this.update();
		} catch (error) {
			console.error('Error while trying to save into file!', 'name: ' + this.name, 'key: ' + key);
			console.error(error);

			return false;
		}
		return true;
	}
	async get(key: string) {
		return this.lsGet(key);
		// if (await this.checkPermission()) return null;
		
		// // @ts-ignore
		// return this.sessionData[key] ?? null;
	}
}