<template>
    <div id="upperbar" class="header">
        <div class="side">
            <div v-on:click='changeMenu(0)'>
                <span>Медиа</span>
                <div v-if="panelNumber == 0" class='menubutton'>
                    <div>фонотека</div>
                    <div>библиотека</div>
                    <div>видеофайлы</div>
                    <div>медиатека</div>
                </div>
            </div>

            <div v-on:click='changeMenu(1)'>
                <span>Курсы</span>
                <div v-if="panelNumber == 1" class='menubutton'>
                <div>Список курсов</div>
            </div>
            </div>
            
            <div v-on:click='changeMenu(2)'>
                <span>Магазин</span>
                <div v-if="panelNumber == 2" class='menubutton'>
                <div>Книги</div>
                <div>Прочее</div>
            </div>
            </div>
            
            <div v-on:click='panelNumber = 3'>
                <span>ИНТЕРАКИВНЫЙ КОНСТРУКТОР РЕЖИССЕРА</span>
                <div v-if="panelNumber == 3" class='menubutton'>
                <div>Сценарии</div>
                <div>Конструктор</div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    el: '.side',
    data: () => (
        {
            panelNumber: -1,
        }),
    methods:
    {
        changeMenu(value) {
            this.panelNumber = this.panelNumber == value ? -1 : value;
        }
    }
}
</script>

<style scoped lang ="less">
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90px;
    border-bottom: 1px solid black;
    background-color: #343F56;

    .side {
        color: white;
        display: flex;
        align-items: center;
        width:40%;

        div:not(.menubutton) {
            width: 25%;
        }

        span{
            font-size: 18px;
            cursor: pointer;
        }
        span:hover{
            font-size:19px;
            color: gray;
            
        }

        .menubutton {
            background-color: #F54748;
            position: absolute;
            display: block; 
            width:100px;
            div{
                cursor:pointer;
                &:hover{
                    color: gray;
                }
            }
            
        }
    }
}
</style>