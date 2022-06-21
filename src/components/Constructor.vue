<template>
    <div id="interactiveFormBlock" v-on:click="loadComponent()">
        <div class="buttonsBlock">
            <b>Ширина Метр</b>
            <input type="number" value=20 id="width" placeholder="ширина">
            <b>Высота Метр</b>
            <input type="number" value=10 id="height" placeholder="высота">
            <b>Маштаб сетки</b>
            <input type="number" value=50 id="cellSize" placeholder="Размер клетки">

             <input type="button" class="averageButton" id="chooseStadion" value="Стадион" onclick="refreshGrid(STADIUMBACKGROUND)">
              <input type="button" class="averageButton" id="chooseRoad" value="Дорога" onclick="refreshGrid(ROADBACKGROUND)">
            <input type="button" class="averageButton" id="save" value="Сохранить как изображение"
                onclick="saveAsImage()">
            <input type="button" class="averageButton" id="openForm" value="Открыть форму" onclick="openForm()">
            
        </div>
        <div class="canvasBlock" id = "gridBlock">
            <canvas id='grid' width=2000 height=1000>Обновите браузер</canvas>
            
        </div>
        <div class="selectItemBlock">
            <div class="selectBlock" id="humanBlock">
                <h3>Люди</h3>
                <div class="addElementsButtonBlock">

                </div>
            </div>
            <div class="selectBlock" id="techBlock">
                <h3>Техника</h3>
                <div class="addElementsButtonBlock">

                </div>
            </div>
            <div class="selectBlock" id="decorationBlock">
                <h3>Декорации</h3>
                <div class="addElementsButtonBlock">

                </div>
            </div>
            <div id="addElementForm">
                <b>Название</b>
                <input placeholder="Название" id = "nametypeInput">
                <b>Цвет</b>
                <input type="color" id="addColor">
                <input type="button" value="Добавить элемент" onclick="addElement()">
                <input type="button" value="Закрыть форму" onclick="closeForm()">
                <input type="radio" name="r1" value="0">Человек<br>
                <input type="radio" name="r1" value="1">Техника<br>
                <input type="radio" name="r1" value="2">Декорации<br>
            </div>
            <div id="formElementsInfo">
                <h3>Используемые элементы</h3>
            </div>
        </div>
    </div>


</template>
<script>



//import grid from './scripts/grid.js';

export default {
  data: () => ({
    
    }),

    mounted() {

      let gridScript = document.createElement('script');
       gridScript.setAttribute('src', "grid.js");//c:/vue-projects/diplom-site-2
       gridScript.setAttribute('type', "text/javascript");
      let parent = document.getElementById('gridBlock');
       parent.appendChild(gridScript);
    },
    methods: {
      loadComponent(){
      }
    }
    // components:
    // {
    //   GridComponent: () =>
    //   {
    //     return new Promise((resolve,reject)=>
    //     {
    //        let gridScript = document.createElement('script');
    //        gridScript.onload = () => {
    //         resolve(import(grid));
    //        }
    //        gridScript.src = './scripts/grid.js';
    //        let parent = document.getElementById('gridBlock');
    //         parent.appendChild(gridScript);
    //     })
    //   }
    // }
}
</script>
<style scoped>
h3{
  text-align: center;
  background-color: #343F56;
  margin: 0;
  color: #fff;
}
.selectBlock{
    background-color: #F5E6CA;
   flex-direction: column;
   margin-right: 5px;
}
.buttonsBlock
{
    background-color: #FB9300;
}
.selectItemBlock{
   display: flex;
    width:50%;
}
.selectFormElementButton
{
    background-color: #F54748; /* Green */
    border: none;
    color: white;
    padding: 5px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    width: 70%;
}
.selectFormElement
{
  background-color: #F5E6CA;
}
.inBlockIcon
{
    width: 20%;
    height: auto;
}
.addElementsButtonBlock
{
  background-color: #F5E6CA;
}

input[type="color"] {
    -webkit-appearance: none;
    border: none;
    background: #fff;
    width: 25px;
    height: 25px;
    border: 5px solid #F54748;
    border-radius: 50%;
  }
  
  
  /* -webkit */
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;    
  }
  
  input[type="color"]::-webkit-color-swatch {
    border: none;  
    border-radius: 50%;
  }
  
  
  /* firefox */
  input[type=color]::-moz-focus-inner {
    border: none;
    padding: 0;
    border-radius: 50%;
  }
  
  input[type=color]::-moz-color-swatch {
    border: none;
    border-radius: 50%;
  }
.averageButton
{
    background-color: #343F56; /* Green */
    border: none;
    color: white;
    padding: 5px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
}
.averageButton:hover
{
  color:gray;
}
.infoFormElement
{
  display:block;
}
#addElementForm
{
  display: none;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
  width: 250px;
  height: 250px;
  background-color: #FB9300;
}
#formElementsInfo
{
  background-color: #F5E6CA;
}
#interactiveFormBlock
{
    background-color: #fff;
}
#grid
{
    background-color: white;
}
</style>