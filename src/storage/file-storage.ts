import { App, Notice, TFile } from "obsidian";
import { getFilePath, parseEntries, stringifyEntries } from "./utils";
import ViewCountStorage from "./view-count-storage";
import Logger from "js-logger";
import _ from "lodash";

export default class FileStorage extends ViewCountStorage {
	private app: App;

	constructor(app: App) {
		super();
		this.app = app;
	}

	debounceSave = _.debounce(() => this.save(this.app), 200);
	debounceRefresh = _.debounce(() => this.refresh(), 200);

	async load() {
		Logger.trace("FileStorage load");
		const path = getFilePath(this.app);
		const exists = await this.app.vault.adapter.exists(path);

		if (!exists) {
			const data = stringifyEntries([]);
			try {
				Logger.debug("Creating file cache");
				await this.app.vault.create(path, data);
			} catch (err) {
				console.error("Error creating file cache: ", (err as Error).message);
				new Notice("View Count: error loading view count");
			}
			return;
		}

		try {
			const result = await this.app.vault.adapter.read(path);
			this.entries = parseEntries(result);
			Logger.debug("Loaded entries", { entries: this.entries });
			this.refresh();
		} catch (err) {
			console.error("Error loading file cache: ", (err as Error).message);
			new Notice("View Count: error loading cache");
		}
	}

	async save(app: App) {
		Logger.trace("FileStorage save");
		try {
			const path = getFilePath(app);
			const data = stringifyEntries(this.entries);
			await app.vault.adapter.write(path, data);
		} catch (err) {
			console.error("Error saving file cache: ", (err as Error).message);
			new Notice("View Count: error saving file cache");
		}
	}

	async incrementViewCount(file: TFile) {
		Logger.trace("FileStorage incrementViewCount");
		Logger.debug("Incrementing view count for file", { path: file.path });
		const entry = this.entries.find((entry) => entry.path === file.path);

		if (entry) {
			Logger.debug("Incrementing existing entry");
			this.entries = this.entries.map((entry) => {
				if (entry.path === file.path) {
					return {
						...entry,
						viewCount: entry.viewCount + 1,
						lastViewMillis: Date.now()
					};
				}
				return entry;
			});
		} else {
			Logger.debug("Adding new entry");
			this.entries = [...this.entries, {
				path: file.path,
				viewCount: 1,
				lastViewMillis: Date.now()
			}];
		}

		this.debounceSave();
		this.debounceRefresh();
	}

	async getLastViewTime(file: TFile) {
		return this.entries.find((entry) => entry.path === file.path)?.lastViewMillis ?? 0;
	}

	async getViewCount(file: TFile) {
		return this.entries.find((entry) => entry.path === file.path)?.viewCount ?? 0;
	}

	async renameEntry(newPath: string, oldPath: string) {
		Logger.trace("FileStorage renameEntry");
		Logger.debug("Renaming entry", { oldPath, newPath });
		this.entries = this.entries.map((entry) => {
			if (entry.path === oldPath) {
				entry.path = newPath;
			}
			return entry;
		});

		this.debounceSave();
		this.debounceRefresh();
	}

	async deleteEntry(file: TFile) {
		Logger.trace("FileStorage deleteEntry");
		Logger.debug("Deleting entry", { path: file.path });
		this.entries = this.entries.filter((entry) => entry.path !== file.path);

		this.debounceSave();
		this.debounceRefresh();
	}
}
