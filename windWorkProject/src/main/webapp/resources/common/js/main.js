/* EXPANDER MENU */
const showMenu = (toggleId, navbarId, bodyId) => {
    const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId)
    if( toggle && navbar ) {
        toggle.addEventListener('click', ()=>{
            navbar.classList.toggle('expander');
            bodypadding.classList.toggle('body-pd')
        })
    }
}

showMenu('nav-toggle', 'navbar', 'body-pd')

/* LINK ACTIVE */
const linkColor = document.querySelectorAll('.nav__link')
function colorLink() {
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))



function toggleDisplay() {
    let rightUserinfo = document.querySelector('#rightUserinfo');
    let rightUserinfo2 = document.querySelector('#rightUserinfo2');

    if (window.getComputedStyle(rightUserinfo).display === 'none') {
        rightUserinfo.style.display = 'flex';
        rightUserinfo2.style.display = 'flex';
    } else {
        rightUserinfo.style.display = 'none';
        rightUserinfo2.style.display = 'none';
    }
}

