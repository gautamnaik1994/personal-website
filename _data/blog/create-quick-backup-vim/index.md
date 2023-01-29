---
title: Create quick backup of current file in VIM
date: 2023-01-29T17:45:06.582Z
slug: create-quick-backup-vim
updatedDate: 2023-01-29T17:45:06.607Z
description: Sometimes we have to create a copy of the current working file,
  just to try out some new thing or feature.
publish: true
tags:
  - vim
categories:
  - vim
category: Vim
keywords:
  - vim
  - keymap
bannerImage: create-backup.png
---

Sometimes we have to create a copy of the current working file, just for trying out some new thing or feature.

Of course, version control systems were made for this solving this problem.

But, let's say you don't want to use version control, so the other option is to duplicate the file, rename it either by changing the filename or the extension.

This task will take some time, but in vim, you can use the command `:w %.bak` to create a version of the current file with `yourfilename.extension.bak` in the same directory.

## Command

```vim
:w %.bak
```

## Explanation

- `:w` : Write file to disk
- `%` : Get current file name
- `.bak` : Arbitrary extension name for the file