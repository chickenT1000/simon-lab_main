(function() {
    const script = document.currentScript;
    const key = script ? script.dataset.counterKey : '';

    if (!key || !/^[a-z0-9._/-]+$/i.test(key)) {
        return;
    }

    const img = document.createElement('img');
    img.src = 'https://hits.sh/' + key + '.svg';
    img.alt = '';
    img.width = 1;
    img.height = 1;
    img.setAttribute('aria-hidden', 'true');
    img.referrerPolicy = 'no-referrer-when-downgrade';
    img.style.position = 'absolute';
    img.style.width = '1px';
    img.style.height = '1px';
    img.style.opacity = '0';
    img.style.pointerEvents = 'none';
    img.style.left = '-9999px';

    document.body.appendChild(img);
}());
