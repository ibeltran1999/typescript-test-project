import { Aprendiz, NivelEducativo } from "./aprendiz.js";
import { Curso } from "./curso.js";
var cursos = [
    new Curso("Practicas esenciales para el agilismo", 20, 90, true, 2019),
    new Curso("Ingenieria de software para la ewb", 15, 90, false, 2013),
    new Curso("Pruebas Automatizadas", 20, 15, true, 2017),
    new Curso("Principios Arquitectura", 30, 75, false, 2020)
];
export var ap = new Aprendiz("Juan Pablo", "Reyes", "avantar.png", 30, NivelEducativo.POSGRADO, cursos);
console.log(ap.cursos);
var aprendizTable = document.getElementById("aprendiz");
var estadisticasTable = document.getElementById("estadisticas");
var cursosTable = document.getElementById("cursos");
var cursosTbody = cursosTable.tBodies[0];
var btnFiltro = document.getElementById("boton-filtro");
var textoBusqueda = document.getElementById("texto-busqueda");
btnFiltro.onclick = function () {
    var text = textoBusqueda.value.trim().toLowerCase();
    var cursosFiltrados = ap.cursos.filter(function (c) {
        return c.nombre.toLowerCase().indexOf(text) !== -1;
    });
    mostrarCursosAprendiz(cursosFiltrados);
};
mostrarDatosAprendiz(ap);
mostrarEstadistica(ap);
mostrarCursosAprendiz(ap.cursos);
function mostrarDatosAprendiz(aprendiz) {
    var tbodyAprendiz = document.createElement("tbody");
    tbodyAprendiz.innerHTML = "<tr><td colspan= 2><img src=\"./".concat(aprendiz.avatar, "\" height= \"100\">\n       <tr><td>Nombre:</td><td>").concat(aprendiz.nombres, "</td></tr>\n       <tr><td>Apellidos:</td><td>").concat(aprendiz.apellidos, "</td></tr>\n       <tr><td> Nivel Educativo:</td><td>").concat(aprendiz.nivelEducativo, "</td></tr>\n       <tr><td> Edad:</td><td>").concat(aprendiz.edad, "</td></tr>");
    aprendizTable.appendChild(tbodyAprendiz);
}
function mostrarEstadistica(aprendiz) {
    var numeroCertificados = aprendiz.darCursosCertificados();
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td><b>Cursos certificados</b></td><td>".concat(numeroCertificados, "</td>");
    estadisticasTable.appendChild(trElement);
}
function mostrarCursosAprendiz(cursos) {
    var filas = cursos.map(function (curso) {
        var trElement = document.createElement("tr");
        trElement.insertCell().textContent = curso.nombre;
        trElement.insertCell().textContent = String(curso.horas);
        var calificacionCell = trElement.insertCell();
        calificacionCell.textContent = String(curso.calificacion);
        calificacionCell.style.color = curso.calificacion > 60 ? "green" : "red";
        trElement.insertCell().textContent = String(curso.certificado);
        trElement.insertCell().textContent = String(curso.anio);
        return trElement;
    });
    cursosTbody.replaceChildren.apply(cursosTbody, filas);
}
