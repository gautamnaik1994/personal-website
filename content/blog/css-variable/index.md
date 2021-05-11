---
slug: '/css-variable'
date: '2019-08-23'
updatedDate: '2019-08-27'
title: 'CSS Variables'
description: 'CSS variables is a new addition to CSS. As the name says, we can now add custom variables, similar to SCSS, Less and Stylus.'
categories: ['css']
tags: ['css', 'css-variables']
keywords: ['css', 'css-variables']
banner: './images/banner.png'
---

CSS variables is a new addition to CSS. As the name says, we can now add custom variables, similar to SCSS, Less and Stylus.

### Example

```css
:root {
  --primary: #545546;
  --secondary: #234234;
}

button {
  background-color: var(--primary);
}
```

This feature can be used to implement themes for any website, without the need to write additional CSS classes for each color.
_for eg,_ One can change the primary color website just by changing the primary color variable using Javascript.

```javascript
let root = document.documentElement;

root.addEventListener('click', (e) => {
  root.style.setProperty('--primary', '#555555');
});
```

Notice the `:root` selector, this means that the variables declared inside this(`:root`) will be available to all other elements.
CSS Variables can be also scoped to a particular element. This can be done by defining them inside the selector where you want to use it.

```css
.button {
  --fontSize: 14px;
  font-size: var(--fontSize);
}
.big-button {
  --fontSize: 20px;
  font-size: var(--fontSize);
}
```

If the variable is not defined or may not be available/accessible due to any reasons (like scoping of variables) the second argument of `var(--primary, red)` is used.

```css
.button {
  --fontSize: 14px;
  font-size: var(--fontSize);
  color: var(--primary, red);
}
```

Another cool thing that CSS variables can do is change the `box-shadow` size of an element on hover.
Before CSS variables, we had to write the following code to change the `box-shadow` on hover.

### Before CSS Variables

```css
.button {
  box-shadow: 0 3px 7px 2px grey;
}

.button:hover {
  box-shadow: 0 3px 20px 2px grey;
}
```

Notice that we had to write the entire box-shadow syntax again.

### Using CSS Variables

```css
.button {
  --blur: 7px;
  box-shadow: 0 3px var(--blur) 2px grey;
}

.button:hover {
  --blur: 20px;
}
```

As we can see, this method can be extended to use any CSS property like `background-image` URL's and will also help in writing cleaner CSS.

## Usage with SCSS

Note that we can use this feature with SCSS/SASS if you want.

## Usage with Styled Components

[Styled Components](https://www.styled-components.com/) is a component-based styling framework for [Reactjs](www.reactjs.org). This blog is built using styled-components. When using styled-components, we can define color variables in a dedicated file.

```javascript
export const primaryCol = '#2459ff';
export const accentColor = '#ff8000';
```

Then import it in any component. The benefit of this is that all color variable stays in the same place. The drawback of this method is that we have to import it wherever you want it.

### CSS Variables to the rescue

If we use CSS Variables, we don't have to import it in every component. We can directly use it inside Styled Component.

```javascript
const StyledDiv = styled.div`
  background-color: var(--primary);
`;
```

## Browser Support

As of now, according to [caniuse.com](https://caniuse.com) all major latest browsers
support CSS Variables [CSS variable Support](https://caniuse.com/#feat=css-variables)

There are some polyfills available according to this [IE11 - does a polyfill / script exist for CSS variables?](https://stackoverflow.com/questions/46429937/ie11-does-a-polyfill-script-exist-for-css-variables) StackOverflow question. Although they come with their own set of limitations.

### Polyfills

- [css-vars-ponyfill](https://jhildenbiddle.github.io/css-vars-ponyfill/#/)
- [ie11CustomProperties](https://github.com/nuxodin/ie11CustomProperties)

## Closing Thoughts

Although This is a useful feature, I wouldn't completely stop using CSS preprocessors in my projects. I am saying this because the benefits of using preprocessors are far more than using pure CSS.

### Advantages of Preprocessor

- Nesting(Very important)
- Mixins
- Placeholders
- Loops
- Autoprefixing using prefixers (Needed for legacy browser support)

Even If I want to use this feature, I will use it in combination with CSS preprocessors so that I can use Javascript to control the CSS variables.
