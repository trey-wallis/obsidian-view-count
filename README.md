# Obsidian View Count

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22view-count%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)

## About

This plugin will track the view count for each file in your vault. The count can be seen as a property or at the bottom of the note in the status bar depending on plugin configuration.

![](/readme/property-storage.gif)

![](/readme/file-storage.gif)

## Installation

1. In Obsidian, open **Settings**
2. Go to **Community plugins**
3. Select **Browse**
4. Search for **View Count** by Trey Wallis
5. Select **Install**
6. Then select **Enable**

## Usage

By default the plugin will save view count in a property called `view-count` in each file that is opened. The view count will be incremented once a day. To change these settings, please view the **Settings** section below.

### Highest view count

To see a list of the 20 notes with the highest view count, open the sidebar and click on the eye icon

![](/readme/list.png)

### Settings

#### Storage

This plugin has 2 storage options for view count: **Property** and **File**. Please restart Obsidian after changing this setting.

**Property storage** - If property is selected, each note will have their view count stored in a property in their frontmatter.

**File storage** - If file is selected, the view count for all notes will be stored in a JSON file called `view-count.json` in the Obsidian config directory (by default `.obsidian`). The view count will then appear in the status bar at the bottom of each note.

#### Other

**Increment count once a day** - if enabled a view count will increment once a day. _Once a day_ meaning an opening of a file after 12 am your local time for any given date. If disabled, the view count will increment each time the file is opened.

When increment a day is enabled and the property type is set to storage, a last view date property will be stored to your note.

## Pros/cons for each storage type

### Property storage

#### Pros

-   The view count information is stored in the frontmatter of each note, making it more accessible
-   Since the view count is stored in frontmatter, it can be viewed on mobile

#### Cons

-   Only markdown files can have frontmatter keys, so view count will be only be tracked for markdown files

-   Since the frontmatter needs to update every time a view occurs, your files may update frequently than you would like, especially if you stored by recently modified (like me)

### File storage

#### Pros

-   View count is stored for all file types, including custom extensions
-   View count is stored in one file, versus scattered across your notes

#### Cons

-   Since the view count is displayed in the status bar, you cannot see the view count on mobile
