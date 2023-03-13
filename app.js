const containers = document.querySelectorAll('.input__container');
const form = document.querySelector('form');

const tl = gsap.timeline({ defaults: { duration: 1 } });

// Line
const start = 'M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512';
const end = 'M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512';

// Elastic Effect
containers.forEach(container => {
    const input = container.querySelector('.input');
    const line = container.querySelector('.elastic-line');
    const placeHolder = container.querySelector('.placeholder');
    input.addEventListener('focus', () => {
        // check if there's any input 
        // If so, make the attribute current pos to the end post which is bent in the svg
        // reset the attribute to start again half way through the prior animation
        // Finally, have the placeholder move upwards and scale it down 1.4secs
        if (!input.value) {
            tl.fromTo(line, { attr: { d: start } }, { attr: { d: end }, ease: 'Power2.easeOut', duration: 0.75 });
            tl.to(line, { attr: { d: start }, ease: 'elastic.out(3, 0.5)' }, '<50%');
            tl.to(placeHolder, { top: -15, left: 0, scale: 0.7, duration: 0.5, ease: 'Power2.easeOut' }, '-=1.4'); // '<15%'
        }
    });
});

// Revert once it's not focused
form.addEventListener('focusout', () => {
    containers.forEach(container => {
        const input = container.querySelector('.input');
        const line = container.querySelector('.elastic-line');
        const placeHolder = container.querySelector('.placeholder');
        //check for both an inactive and empty input
        if (document.activeElement !== input && !input.value) {
            gsap.to(placeHolder, { top: 0, left: 0, scale: 1, duration: 0.5, ease: 'Power2.easeOut' });
        }
        //Validations
        input.addEventListener('input', (e) => {
            checkNameValidation(e, line, placeHolder);
            checkEmailValidation(e, line, placeHolder);
            checkPhoneValidation(e, line, placeHolder);
        });
    })
});

//Validations
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function validatePhone(phone) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone);
}

// Colorize
function colorize(color, line, placeHolder) {
    gsap.to(line, { stroke: color, duration: 0.75 });
    gsap.to(placeHolder, { color: color, duration: 0.75 });
}

function checkNameValidation(e, line, placeHolder) {
    if (e.target.type === 'text') {
        let inputText = e.target.value;
        if (inputText.length > 2)
            colorize('#6391E8', line, placeHolder);
        else
            colorize('#FE8C99', line, placeHolder);
    }
}

function checkEmailValidation(e, line, placeHolder) { 
    if (e.target.type === 'email') {
        let isValid = validateEmail(e.target.value);
        if (isValid)
            colorize('#6391E8', line, placeHolder);
        else
            colorize('#FE8C99', line, placeHolder);
    }
}

function checkPhoneValidation(e, line, placeHolder) { 
    if (e.target.type === 'tel') {
        let isValid = validatePhone(e.target.value);
        if (isValid)
            colorize('#6391E8', line, placeHolder);
        else
            colorize('#FE8C99', line, placeHolder);
    }
}

// Checkbox animation fill 
const checkbox = document.querySelector('.checkbox');
const tl2 = gsap.timeline({ defaults: { duration: 0.5, ease: 'Power2.easeOut' } });
const tickMarkPath = document.querySelector('.tick-mark path');
const pathLength = tickMarkPath.getTotalLength();

// Must have this to work with the strokeDashoffset property
gsap.set(tickMarkPath, {strokeDashoffset: pathLength, strokeDasharray: pathLength});


/**
 * Check that the checkbox is checked. If so, reveal the blue div and draw the tick 
 * Otherwise, hide it
 */
checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
        tl2.to('.checkbox--fill', { top: '0%' });
        tl2.fromTo(tickMarkPath, { strokeDashoffset: pathLength }, { strokeDashoffset: 0 }, "<50%");
        tl2.to('.checkbox__label', { color: '#6391e8' }, '<');
        
    } else {
        tl2.to('.checkbox--fill', { top: '100%' });
        tl2.fromTo(tickMarkPath, { strokeDashoffset: 0 }, { strokeDashoffset: pathLength }, '<50%');
        tl2.to('.checkbox__label', { color: '#c5c5c5' }, '<');
    }
});

// Submission
const button = document.querySelector('.submit');
const tl3 = gsap.timeline({ defaults: { duration: 0.75, ease: 'Power2.easeOut' } });

/**
 * Prevent the default submission
 * Scale the form parallel to the animations 
 * Bring up the submitted div 
 */
button.addEventListener('click', (e) => {
    e.preventDefault();
    tl3.to('.contact__right, .contact__left', { y: 30, opacity: 0, pointerEvents: 'none' });
    tl3.to('form', { scale: 0.8 }, '<');
    tl3.fromTo('.submitted', { opacity: 0, y: 30 }, { opacity: 1, y: 0 });
});
