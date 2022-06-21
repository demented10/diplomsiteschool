
const HUMAN = 0;
const TECH = 1;
const DECORATION = 2;

const TRIANGLEFORM = 10;
const SQUAREFORM = 11;
const CIRCLEFORM = 12;

const STADIUMBACKGROUND = 50;
const ROADBACKGROUND = 51;

const HUMAN_LABEL_NAME = "Человек";
const TECH_LABEL_NAME = "Техника";
const DECORATION_LABEL_NAME = "Декорация";



const ICONSIZE = 22;
const ELEMENTICONDECREASE = 7;
//var Square = new FormElement([new Point(0,0)]);

var grid;
var width = 20, height = 10;
var cellSize = 100;


var blockedElements = [];

var selectedType = TRIANGLEFORM;
var selectedFormElement = null;
var selectedColor = "red";
//Массив элементов добавленных в список для выбора
var formElements = [];
//Массив элементов сетки
var gridElements = [];

var selectedBackground = -1;

//////НЕ ЗАБЫТЬ РАЗОБРАТЬСЯ С ЭТИМ!!!!
refreshGrid();
addEventListeners();
function addEventListeners(){
//Отключаем контекстное меню при нажатии ПКМ на сетке
grid.addEventListener("contextmenu", Event => Event.preventDefault());
//Добавляем слушателя для нажатия любой кнопки мыши
grid.addEventListener('mouseup', function (e) {
    
    var x = e.pageX - e.target.offsetLeft,
        y = e.pageY - e.target.offsetTop;
    ctx = grid.getContext('2d');
    //alert("X: " + x + "Y: " + y + " selectedType: " + selectedType + " selectedColor: " + selectedColor + " ctx: " + ctx);
    cellID = getGridCell(x,y)[0];
    getElementPositionByCellID(cellID);
    //Нажатие ЛКМ
    if (selectedFormElement != null && checkBlockedCell(cellID) && e.button == 0)
    {
        addElementToGrid(new GridElement(selectedFormElement,cellID));
       updateGrid();
    }
    //Нажатие ПКМ
    if(e.button == 2 && !checkBlockedCell(cellID))
    {
        removeElementFromGrid(cellID);
        
        refreshGrid(selectedBackground);
        updateGrid();
    }
});
}
//функция для перерисовывания сетки 
function updateGrid()
{
    for(let i =0; i < gridElements.length; i++)
    {
        let cellID = gridElements[i].cellID;
        let position = getElementPositionByCellID(cellID);
        let element = gridElements[i].formelement;

        drawType(position[0], position[1], element.formtype, element.color, ctx);
    }
}
//Функция для удаления элемента с сетки
function removeElementFromGrid(cellID)
{
    let index = gridElements.findIndex(t=>t.cellID == cellID);
    console.log(gridElements[index].formelement.name + " " + index);
    gridElements.splice(index,1);
}
//Функция для добавления элемента в сетку
function addElementToGrid(element)
{
    console.log("Pushed element: " + element.formelement.name + " cellID: " + element.cellID);
    gridElements.push(element);
}
//функция для проверки заблокированной ячейки
function checkBlockedCell(cellID)
{
    blockedElement = gridElements.find(t=>t.cellID == cellID);
    console.log(blockedElement==undefined);
    return blockedElement==undefined;
}
//Функция для получения позиции ячейки по cellID
function getElementPositionByCellID(cellID)
{
    var yLine = Math.floor(cellID/width);
    var xLine = (cellID-yLine*width);
    var cellCenterX = xLine * cellSize + cellSize / 2;
    var cellCenterY = yLine * cellSize + cellSize / 2;
    return [cellCenterX,cellCenterY];
}
//Функция для получения номера ячейки, ее и ее центра по Х У
function getGridCell(x, y) {
    var vertLine = Math.floor(y / cellSize);
    var horLine = Math.floor(x / cellSize);
    var lineID = width * vertLine + horLine;
    var cellCenterX = horLine * cellSize + cellSize / 2;
    var cellCenterY = vertLine * cellSize + cellSize / 2;
    //alert( "X: " + x + " Y: " + y + " vertical line: " + vertLine + " horizontal line: " + horLine + " lineID: " + lineID + " Center X: " + cellCenterX + " Center Y: " + cellCenterY);
    return [lineID, cellCenterX, cellCenterY];
}
//Функция для сохранения сетки в изображение
function saveAsImage() {
    var dataURL = grid.toDataURL("image/jpeg");
    var buttonsave = document.getElementById("save");
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = dataURL;
    link.download = "canvas.jpg";
    link.click();
    document.body.removeChild(link);
}
//Функция для отрисовки геометрической фигуры на сетке
//for main canvas(grid)
function drawType(x, y, type, color, context) {

    let cell = getGridCell(x, y);
    var id = cell[0], centerX = cell[1], centerY = cell[2];

    let cSize = cellSize-ELEMENTICONDECREASE;

    switch (type) {
        case TRIANGLEFORM:
            drawTriangle(centerX, centerY, cSize, color, context);
            break;
        case SQUAREFORM:
            drawSquare(centerX, centerY, cSize, color, context);
            break;
        case CIRCLEFORM:
            drawCircle(centerX, centerY, cSize, color, context);
            break;
    }
}
//Функция для отрисовки фигуры на любом заданом канвасе
//For any canvases
function drawTypeAnyCanvas(x, y, type, size, color, context) {
    switch (type) {
        case TRIANGLEFORM:
            drawTriangle(x, y, size, color, context);
            break;
        case SQUAREFORM:
            drawSquare(x, y, size, color, context);
            break;
        case CIRCLEFORM:
            drawCircle(x, y, size, color, context);
            break;
    }

}
//Функция отрисовки заполненого круга
function drawCircle(centerX, centerY, size, color, context) {
    context.beginPath();
    context.arc(centerX, centerY, size / 2, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    ctx.closePath();
}
//Функция отрисовки заполненого треугольника
function drawTriangle(centerX, centerY, size, color, context) {
    context.beginPath();
    context.moveTo(centerX - size / 2, centerY + size / 2);
    context.lineTo(centerX, centerY - size / 2);
    context.lineTo(centerX + size / 2, centerY + size / 2);
    context.fillStyle = color;
    context.fill();
    ctx.closePath();
}
//Функция отрисовки заполненого квадрата
function drawSquare(centerX, centerY, size, color, context) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(centerX - size / 2, centerY - size / 2, size, size);
    ctx.closePath();
}

//Функция для отрисовки дороги с разметкой на сетке
function drawRoad()
{
    ctx.beginPath();
    ctx.rect(0, 0, grid.width, grid.height);
    ctx.fillStyle = "lightgrey";
    ctx.fill();
    let realWidth = cellSize*width;
    let realHeight = cellSize*height;
    let linewidth = cellSize*3;
    let lineheight = cellSize;
    let lineIndent = 3;
    let lineCount = width/lineIndent; 
     for(let i = 0; i < lineCount; i++)
     {
        ctx.beginPath();
        ctx.rect(i*(lineIndent*cellSize+lineIndent*cellSize),realHeight/2-lineheight/2,linewidth,lineheight);
        ctx.fillStyle = "white";
        ctx.fill();
        
     }
}
//Фукнция для отрисовки стадиона на сетке
function drawStadium()
{
    ctx.fillStyle="#33CC99";
	ctx.lineWidth=0.5;
    ctx.beginPath();
    ctx.moveTo(width*cellSize*0.2,cellSize/2);
    ctx.quadraticCurveTo(0,height*cellSize/2,width*cellSize*0.2,height*cellSize-cellSize/2);
    ctx.stroke();
    ctx.fill();
    ctx.moveTo((width-width*0.2)*cellSize,cellSize/2);
    ctx.quadraticCurveTo(width*cellSize,height*cellSize/2,(width-width*0.2)*cellSize,height*cellSize-cellSize/2);
    ctx.stroke();
    ctx.fill();
   
    ctx.fillRect(width*cellSize*0.2,cellSize/2,(width-width*0.2)*cellSize-width*cellSize*0.2,height*cellSize-cellSize/2 - cellSize/2);
    ctx.moveTo(width*cellSize*0.2,cellSize/2);
    ctx.lineTo((width-width*0.2)*cellSize,cellSize/2);
    ctx.moveTo(width*cellSize*0.2,height*cellSize-cellSize/2);
    ctx.lineTo((width-width*0.2)*cellSize,height*cellSize-cellSize/2);
    ctx.stroke();
}
//Функция для обновления изображения на сетке
function refreshGrid(groundType = STADIUMBACKGROUND) {
    //ВАЖНО!
    //addEventListeners();

    selectedBackground = groundType;

    grid = document.getElementById("grid"), ctx = grid.getContext('2d');

    width = document.getElementById('width').value;
    height = document.getElementById('height').value;
    cellSize = document.getElementById('cellSize').value;

    
    grid.width = width * cellSize;
    grid.height = height * cellSize;

    ctx.beginPath();
    ctx.rect(0, 0, grid.width, grid.height);
    ctx.fillStyle = "white";
    ctx.fill();


    switch(selectedBackground)
    {
        case STADIUMBACKGROUND:
            drawStadium();
            break;
        case ROADBACKGROUND:
            drawRoad();
            break;
    }
    for (var i = 0; i <= width; i++) {
        //verticalLines
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, height * cellSize);
    }
    for (var j = 0; j <= height; j++) {
        //verticalLines
        ctx.moveTo(0, j * cellSize);
        ctx.lineTo(width * cellSize, j * cellSize);
    }
    ctx.strokeStyle = "#000";
    ctx.stroke();
}
//Функция для выбора элемента на для рисования на форме
function selectFormElement(id) {
    //selectedFormElement = formElements[id];
    selectedFormElement = formElements.find(t => t.id == id);
    //alert(selectedFormElement.id + " " + selectedFormElement.formtype + " " + selectedFormElement.color);
}
//Функция для добавления на форму нового элемента
function addSelectElementToForm(selectColorIDname,blockIDname, labelname, type,nametype = "empty") {

    color = document.getElementById(selectColorIDname).value;
    elementNumber = formElements.filter(t=>t.name == labelname).length;
    name_ = labelname;
    typeform = new FormElement(formElements.length, elementNumber,name_, color, type,nametype);
    formElements.push(typeform);
    block = document.getElementById(blockIDname);

    var input = document.createElement("input");
    
    var divblock = document.createElement("div");
   
    divblock.className = "selectFormElement";
    
    block.appendChild(divblock);
    input.type = "button";
    input.id = typeform.name + typeform.id;
    input.className = "selectFormElementButton";
    input.value = typeform.name + " " + (typeform.localID + 1);
    input.color = color;
    input.setAttribute("onClick", "javascript: selectFormElement(" + typeform.id + ")");
    addCanvasIcon(typeform,divblock);
    divblock.appendChild(input);
}
function addCanvasIcon(typeform,divblock)
{
    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    canvas.width = ICONSIZE; canvas.height = ICONSIZE;
    canvas.className = "inBlockIcon";
    context.beginPath();
    drawTypeAnyCanvas(ICONSIZE / 2, ICONSIZE / 2, typeform.formtype, ICONSIZE, typeform.color, context);
    divblock.appendChild(canvas);
    return canvas;
}
//Добавление нового элемента из формы-конструктора на форму для выбора элемента
function addElement() {
    //Выбор типа элемента по radiobutton
    var rad=document.getElementsByName('r1');
    let name;
    for (var i=0;i<rad.length; i++) {
        if (rad[i].checked) {
            name = Number(rad[i].value);

        }
    }
    let nametype = document.getElementById("nametypeInput").value;
    switch (name) {
        case HUMAN:
            addSelectElementToForm("addColor","humanBlock",HUMAN_LABEL_NAME,TRIANGLEFORM,nametype);          
            break;
        case TECH:
            addSelectElementToForm("addColor","techBlock",TECH_LABEL_NAME,SQUAREFORM,nametype);    
            break;
        case DECORATION:
            addSelectElementToForm("addColor","decorationBlock",DECORATION_LABEL_NAME,CIRCLEFORM,nametype);
            break;
    }
    updateFormElementsInfo();
}
//функция для отрытия формы
function openForm() {
    document.getElementById("addElementForm").style.display = "block";
}

//Для закрытия формы
function closeForm()
{
    document.getElementById("addElementForm").style.display = "none";
}
//Функция для обнволения информации на форме используемых элементов
function updateFormElementsInfo()
{
    let infoBlock = document.getElementById("formElementsInfo");
    infoBlock.innerHTML = '';
    for(let i = 0; i<formElements.length;i++)
    {
        let typeform = formElements[i];
        
        let parent = document.createElement("div");
        parent.className = "infoFormElement";
        let label = document.createElement("span");
        label.innerHTML = typeform.nametype;
        let canvas = addCanvasIcon(typeform,parent);
        parent.appendChild(label);
        infoBlock.appendChild(parent);
    }

}
//Класс в котором содержатся все данные о элементе находящемся на форме для выбора
class FormElement {

    constructor(id,localID, name, color, formtype,nametype = "empty") {
        this.id = id;
        this.name = name;
        this.nametype = nametype;
        this.color = color;
        this.formtype = formtype;
        this.canvasName = "iconCanvas" + name + id;
        this.localID = localID;
        function refreshLocalID(value)
        {
            localID = value;
        }
    }
    
}
//Класс в котором содержатся все данны о элементе находящемся на сетке
class GridElement
{
    constructor(formelement,cellID)
    {
        this.formelement = formelement;
        this.cellID = cellID;
    }
}
