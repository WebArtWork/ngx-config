import { Injectable } from '@angular/core';
import { Language } from 'src/app/modules/translate/translate.service';
import { environment } from 'src/environments/environment';
import { CoreService, HttpService } from 'wacom';

interface Config {
	currency: string;
	ip: string;
	languages: Language[];
}

@Injectable({
	providedIn: 'root'
})
export class ConfigService {
	ip = '';

	currency = '$';

	languages: Language[] = (
		environment as unknown as { languages: Language[] }
	).languages
		? (environment as unknown as { languages: Language[] }).languages
		: [
			{
				code: 'en',
				name: 'English',
				origin: 'English'
			}
		];

	constructor(
		private _http: HttpService,
		private _core: CoreService
	) {
		this._http.get('/api/user/config', (config: Config) => {
			if (config.currency) {
				this.currency = config.currency;

				this._core.emit('currency', this.currency);
			}

			if (config.ip) {
				this.ip = config.ip;

				this._core.emit('ip', this.ip);
			}

			if (config.languages) {
				this.languages = config.languages;

				this._core.emit('languages', this.languages);
			}
		});
	}
}
