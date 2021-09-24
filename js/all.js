var send = document.querySelector('.send');
var data = JSON.parse(localStorage.getItem('listData')) || [];
var list = document.querySelector('.list');


send.addEventListener('click',calculate);

updataList(data);

function calculate(e) {
    e.preventDefault();
    var height = parseInt(document.querySelector('.height').value);
    var weight = parseInt(document.querySelector('.weight').value);
    var heightCm = height/100;
    var dt = new Date();
    var btYearMonthDay = dt.getDate() + '-' + (dt.getMonth()+1) + '-' + dt.getFullYear()
    console.log('建立日期:' + btYearMonthDay);
    console.log('身高 : ' + height);
    console.log('體重 : '　+ weight);
    var BMI = weight/(heightCm*heightCm);
    var state = '';
    var stateColor = '';
    BMI = parseFloat(BMI.toFixed(2));
    console.log('BMI: '+BMI);
    if (BMI<18.5) {
        state = '過輕';
        stateColor = 'ideal'
    }else if (BMI >18.5 && BMI<=25) {
        state = '理想';
        stateColor = 'Too_light'
    }else if (BMI >25 && BMI<=30) {
        state = '過重';
        stateColor = 'Overweight'
    }else if (BMI >30 && BMI<=35) {
        state = '輕度肥胖';
        stateColor = 'Mild_obesity'
    }else if (BMI >35 && BMI <=40) {
        state = '中度肥胖';
        stateColor = 'Moderate_obesity'
    }else{
        state = '重度肥胖';
        stateColor = 'Severe_obesity';
    }
    console.log('狀態:' + state);

    var todo = {
        state:state,
        BMI:BMI,
        weight:weight,
        height:height,
        buildDate:btYearMonthDay,
        stateColor:stateColor
    }
    console.log(todo);
    data.push(todo);
    updataList(data);
    localStorage.setItem('listData',JSON.stringify(data));
}

function updataList(items) {
    var str = '';
    var len = items.length;
    for(var i = 0 ; i < len ; i++){
        str += `<tbody>
                    <tr>
                        <td class="border-0 border-start border-${items[i].stateColor} border-5">${items[i].state}</td>
                        <td><span>BMI</span> ${items[i].BMI}</td>
                        <td><span class="fs-6">weight </span>${items[i].weight} kg</td>
                        <td><span>height</span> ${items[i].height} cm</td>
                        <td>${items[i].buildDate}</td>
                    </tr>
                </tbody>`
    }
    list.innerHTML = str ;
}