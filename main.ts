import {Aprendiz, NivelEducativo} from "./aprendiz.js";
import {Curso} from "./curso.js";

let cursos = [
    new Curso("Practicas esenciales para el agilismo", 20, 90, true, 2019),
    new Curso("Ingenieria de software para la ewb", 15, 90, false, 2013),
    new Curso("Pruebas Automatizadas", 20, 80, true, 2017),
    new Curso("Principios Arquitectura", 30, 75, false, 2020)
]; 

export const ap = new Aprendiz("Juan Pablo","Reyes", "avantar.png", 30, NivelEducativo.POSGRADO, cursos);

console.log(ap.cursos);

let aprendizTable:HTMLElement = document.getElementById("aprendiz")!;
let estadisticasTable:HTMLElement = document.getElementById("estadisticas")!;
let cursosTable: HTMLTableElement = document.getElementById("cursos") as HTMLTableElement;
let cursosTbody: HTMLTableSectionElement = cursosTable.tBodies[0];
let btnFiltro: HTMLElement = document.getElementById("boton-filtro")!;
let textoBusqueda: HTMLInputElement = <HTMLInputElement>document.getElementById("texto-busqueda")!;

btnFiltro.onclick = () => {
    const text: string = textoBusqueda.value.trim().toLowerCase();
    const cursosFiltrados: Curso[] = ap.cursos.filter(function(c){
        return c.nombre.toLowerCase().indexOf(text) !== -1;
    });
    mostrarCursosAprendiz(cursosFiltrados);
};

mostrarDatosAprendiz(ap);
mostrarEstadistica(ap);
mostrarCursosAprendiz(ap.cursos);


function mostrarDatosAprendiz(aprendiz: Aprendiz): void{
    let tbodyAprendiz = document.createElement("tbody");
    tbodyAprendiz.innerHTML = `<tr><td colspan= 2><img src="./${aprendiz.avatar}" height= "100">
       <tr><td>Nombre:</td><td>${aprendiz.nombres}</td></tr>
       <tr><td>Apellidos:</td><td>${aprendiz.apellidos}</td></tr>
       <tr><td> Nivel Educativo:</td><td>${aprendiz.nivelEducativo}</td></tr>
       <tr><td> Edad:</td><td>${aprendiz.edad}</td></tr>`
       aprendizTable.appendChild(tbodyAprendiz);
}

function mostrarEstadistica(aprendiz: Aprendiz): void{
    let numeroCertificados:number = aprendiz.darCursosCertificados();
    let trElement:HTMLElement = document.createElement("tr");
    trElement.innerHTML = `<td><b>Cursos certificados</b></td><td>${numeroCertificados}</td>`
    estadisticasTable.appendChild(trElement);
}

function mostrarCursosAprendiz(cursos: Curso[]): void{
    cursosTbody.replaceChildren();
    for ( let curso of cursos)
    {
        let trElement = document.createElement("tr")
        trElement.insertCell().textContent = curso.nombre;
        trElement.insertCell().textContent = String(curso.horas);
        trElement.insertCell().textContent = String(curso.calificacion);
        trElement.insertCell().textContent = String(curso.certificado);
        trElement.insertCell().textContent = String(curso.anio);
        cursosTbody.appendChild(trElement)
    }
}