#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sass = require('sass');

const raiz = path.resolve(__dirname, '..');
const dist = path.join(raiz, 'distri');

console.log('Iniciando proceso de build para producción en distri...');

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
['css', 'js', 'fonts'].forEach(d => fs.mkdirSync(path.join(dist, d), { recursive: true }));

console.log('Compilando SCSS...');
const css = sass.compile(path.join(raiz, 'css', 'styles.scss'), { style: 'compressed' }).css;
fs.writeFileSync(path.join(raiz, 'css', 'styles.css'), css);
fs.writeFileSync(path.join(dist, 'css', 'styles.css'), css);

console.log('Copiando archivos HTML y JS...');
fs.copyFileSync(path.join(raiz, 'index.html'), path.join(dist, 'index.html'));
fs.readdirSync(path.join(raiz, 'js')).filter(f => f.endsWith('.js')).forEach(f => {
  fs.copyFileSync(path.join(raiz, 'js', f), path.join(dist, 'js', f));
});

console.log('Copiando fuentes de Open Iconic...');
const fuentes = path.join(raiz, 'node_modules', 'open-iconic', 'font', 'fonts');
if (fs.existsSync(fuentes)) {
  fs.readdirSync(fuentes).forEach(f => {
    fs.copyFileSync(path.join(fuentes, f), path.join(dist, 'fonts', f));
  });
}

console.log('Copiando dependencias vendor a distri...');
function copiar(o, d) {
  if (!fs.existsSync(o)) return;
  if (fs.statSync(o).isDirectory()) {
    fs.mkdirSync(d, { recursive: true });
    fs.readdirSync(o).forEach(n => copiar(path.join(o, n), path.join(d, n)));
  } else {
    fs.copyFileSync(o, d);
  }
}
['bootstrap/dist', 'jquery/dist', 'popper.js/dist', 'open-iconic/font'].forEach(p => {
  copiar(path.join(raiz, 'node_modules', p), path.join(dist, 'node_modules', p));
});

console.log('¡Build de producción finalizado con éxito en distri!');
