import { App, normalizePath, moment } from "obsidian";
import { ViewCountEntry } from "./types";

export const stringifyEntries = (entries: ViewCountEntry[]) => {
	return JSON.stringify({
		items: entries
	}, null, 2);
}

export const parseEntries = (fileData: string) => {
	const json = JSON.parse(fileData);

	if (!json.items)
		return [];

	return json.items
}


export const getFilePath = (app: App) => {
	const VIEW_COUNT_FILE = 'view-count.json';
	return normalizePath(app.vault.configDir + "/" + VIEW_COUNT_FILE);
}

export const unixTimeMillisToDateTime = (unixTimeMillis: number) => {
	const unixTimeSeconds = unixTimeMillis / 1000;
	const normalTimestamp = moment.unix(unixTimeSeconds);
	const formattedTimestamp = normalTimestamp.format('YYYY-MM-DDTHH:mm:ss');
	return formattedTimestamp
}

export const dateTimeToUnixTimeMillis = (dateTime: string) => {
	const normalTimestamp = moment(dateTime);
	const unixTimeMillis = normalTimestamp.valueOf();
	return unixTimeMillis;
}

export const setPropertyType = async (app: App, name: string, value: string) => {
	await (app as any).metadataTypeManager.setType(name, value);
}

export const getPropertyType = async (app: App, name: string): Promise<string> => {
	return (app as any).metadataTypeManager.getAssignedType(name);
}
