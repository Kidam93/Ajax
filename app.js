const getHttpRequest = function(){
    // ancien code de compatibilité, aujourd’hui inutile
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+...
        httpRequest = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) { // IE 6 et antérieurs
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return httpRequest;
}

const btn = document.querySelector('.btn-search')
const form = document.querySelector('.js-filter-form')
const content = document.querySelector('.js-filter-content')
const url = 'http://127.0.0.1:8000/portefolio'

form.addEventListener('submit', function(e){
    e.preventDefault()
    const data = new FormData(form)
    const xhr = getHttpRequest()
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status != 200){
                const errors = JSON.parse(xhr.responseText)
                console.error(errors)
            }
            const dataContent = JSON.parse(xhr.responseText).content
            content.innerHTML = dataContent
        }
    }
    xhr.open('POST', form.getAttribute('action'), true)
    xhr.setRequestHeader('X-REQUESTED-With', 'xmlhttprequest')
    xhr.send(data)
})