---
slug: '/remap-esc'
date: '2020-05-20'
updatedDate: '2020-05-20'
title: 'Why should you remap ESC key in Vim'
description: 'By default,the ESC key is used to switch to Normal mode from Insert mode.But as you can see on a regular keyboard, the position of ESC key is far from the home row keys.'
categories: ['vim']
tags: ['vim', 'keymaps']
keywords: ['vim', 'keymap']
banner: './images/banner.png'
---

---

By default,the <kbd>ESC</kbd> key is used to switch to Normal mode from Insert mode.
But as you can see on a regular keyboard, the position of <kbd>ESC</kbd> key is far from the home row keys. To press it without lifting your entire hand, you have to extend your pinky finger. This is fine if you are doing some light typing/editing.
But doing this for prolonged typing/editing sessions, this can be quite exhausting.

The solution is to remap the <kbd>ESC</kbd> to <kbd>j</kbd><kbd>k</kbd>.

### Command

```vim
inoremap jk <esc>
```

### Explanation

- `inoremap` : Use this mapping in Insert mode
- `jk` : The keys to be pressed
- `<esc>` : The keypress that will get executed

When <kbd>j</kbd><kbd>k</kbd> is pressed immediately in Insert mode, VIM will exit Insert mode and go to Normal mode.

<kbd>j</kbd><kbd>k</kbd> is used because very rarely you will need to type words containing the character <strong> k</strong> followed by <strong>j</strong>.

But transitioning from pressing <kbd>ESC</kbd> to pressing <kbd>j</kbd><kbd>k</kbd> can be difficult as you are used to old mapping.

To break this habit, you will have to disable the <kbd>ESC</kbd> key.

### Command

```vim
inoremap <esc> <nop>
```

### Explanation

- `inoremap` : Use this mapping in Insert mode
- `<esc>` : The key that will be pressed
- `<nop>` : Means no operation will be executed

Once you get used to it, you can restore the original key binding.

---
