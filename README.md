# Animated-Login-Form
A responsive animated login form in JS.


#### NOTE: SVGs came from Figma

# Common confusion on checbox stroke animation

* Check this form for the stroke animation: [Link](https://css-tricks.com/svg-line-animation-works/)
```javascript
// Checkbox animation fill 
const checkbox = document.querySelector('.checkbox');
const tl2 = gsap.timeline({ defaults: { duration: 0.5, ease: 'Power2.easeOut' } });
const tickMarkPath = document.querySelector('.tick-mark path');
const pathLength = tickMarkPath.getTotalLength();

// Must have this to work with the strokeDashoffset property
gsap.set(tickMarkPath, { strokeDashoffset: pathLength, strokeDasharray: pathLength });

/**
 * Check that the checkbox is checked. If so, reveal the blue div and draw the tick 
 * Otherwise, hide it
 */
checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
        tl2.to('.checkbox--fill', { top: '0%' });
        tl2.fromTo(tickMarkPath, { strokeDashoffset: pathLength }, { strokeDashoffset: 0 }, "<50%");
    } else {
        tl2.to('.checkbox--fill', { top: '100%' });
        tl2.fromTo(tickMarkPath, { strokeDashoffset: 0 }, { strokeDashoffset: pathLength }, '<50%');
    }
});
```
