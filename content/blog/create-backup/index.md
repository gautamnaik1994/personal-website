---
slug: '/create-quick-backup-vim'
date: '2019-08-09'
updatedDate: '2019-08-23'
title: 'Create quick backup of current file in VIM'
description: 'Sometimes we have a create a copy of current working file, just for trying out some new thing or feature.'
categories: ['vim']
tags: ['vim', 'keymaps']
keywords: ['vim', 'keymap']
banner: './images/banner.png'
---

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

---
