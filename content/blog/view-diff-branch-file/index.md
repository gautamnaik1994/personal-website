---
slug: '/view-different-branch-file'
date: '2020-05-20'
updatedDate: '2020-05-20'
title: 'View different branch file inside VIM'
description: 'There will come a time when you will want to view the contents of the same file or a different file from another branch.'
categories: ['vim', 'git']
tags: ['vim', 'keymaps']
keywords: ['vim', 'keymap', 'git']
banner: './images/banner.png'
---

---

Over the past few months, VIM has become my goto text editor at both the workplace and at home. I still use Visual Studio Code when I want to inspect the project from a bird's eye view.
There will come a time when you will want to view the contents of the same file or a different file from another branch.
This could be for comparing the changes or just for checking the contents of another file.
_Note that I am not an advanced Git user._

In VIM, there is a plugin named [vim-fugitive](https://github.com/tpope/vim-fugitive) for performing Git operations from within the editor.
Refer to its docs for its usage and commands.

### Commands

#### To inspect the contents of a file for a supplied path.

```vim
:Gvsplit branch_name:path_of_file
```

#### To view the contents of the same file as the working file.

```vim
:Gvsplit branch_name:%
```

#### To compare files.

```vim
:Gvdiffsplit branch_name:%
```

### Explanation

- `:Gvsplit` : Opens file in a vertical split window
- `:Gvdiffsplit` : Opens a file in a vertical split window and compares the file
- `branch_name` : Name of the branch
- `%` : This 'percentage' symbol holds the path of the file from the root of the project

---
