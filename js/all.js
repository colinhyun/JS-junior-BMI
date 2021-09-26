// 宣告變數
var send = document.querySelector('.send');
var data = JSON.parse(localStorage.getItem('listData')) || [];
var list = document.querySelector('.list');
var inside = document.querySelector('.icon-return');

// 監聽button
send.addEventListener('click', calculate);

//inside重新整理
inside.addEventListener('click', reorganize);

//更新資料並顯示在畫面上
updataList(data);

function reorganize(reorganize) {
    console.log('reorganize')
    window.location.reload();
}

// 宣告變數  計算BMI並
function calculate(e) {
    /* 以下為顯示下方資料 */
    e.preventDefault();

    console.log(typeof (document.querySelector('.height').value));
    console.log(typeof (document.querySelector('.weight').value));
    var height = parseInt(document.querySelector('.height').value);
    var weight = parseInt(document.querySelector('.weight').value);

    if ((isnumber(height)) && (isnumber(weight))) {
        alert('是有效的數字');
        var heightCm = height / 100;
        var dt = new Date();
        var btYearMonthDay = dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear()
        console.log('建立日期:' + btYearMonthDay);
        console.log('身高 : ' + height);
        console.log('體重 : ' + weight);
        var BMI = weight / (heightCm * heightCm);
        var state = '';
        var stateColor = '';
        BMI = parseFloat(BMI.toFixed(2));
        console.log('BMI: ' + BMI);

        if (BMI < 18.5) {
            state = '過輕';
            stateColor = 'ideal';
            send.setAttribute('class', 'changeColor-ideal');
            console.log(inside);
        } else if (BMI > 18.5 && BMI <= 25) {
            state = '理想';
            stateColor = 'Too_light';
            send.setAttribute('class', 'changeColor-Too_light');
            inside.setAttribute('class', 'inside-Too_light');
        } else if (BMI > 25 && BMI <= 30) {
            state = '過重';
            stateColor = 'Overweight';
            send.setAttribute('class', 'changeColor-Overweight');
            inside.setAttribute('class', 'inside-Overweight');
        } else if (BMI > 30 && BMI <= 35) {
            state = '輕度肥胖';
            stateColor = 'Mild_obesity';
            send.setAttribute('class', 'changeColor-Mild_obesity');
            inside.setAttribute('class', 'inside-Mild_obesity');
        } else if (BMI > 35 && BMI <= 40) {
            state = '中度肥胖';
            stateColor = 'Moderate_obesity';
            send.setAttribute('class', 'changeColor-Moderate_obesity');
            inside.setAttribute('class', 'inside-Moderate_obesity');
        } else {
            state = '重度肥胖';
            stateColor = 'Severe_obesity';
            send.setAttribute('class', 'changeColor-Severe_obesity');
            inside.setAttribute('class', 'inside-Severe_obesity');
        }

        // 宣告一個 strA 組出 button 裡的 a 標籤 用 innerHTML 套入上面的state、stateColor、strA
        var strA = `<a href="href=javascript:window.location.reload()"><img src="https://i.ibb.co/RTjyZCB/icons-loop.png" class="inside-` + stateColor + `"></a>`
        send.innerHTML = BMI + '<br>' + state + strA;

        console.log('狀態:' + state);

        // 將變數放入todo陣列，push方式放進data陣列，更新介面，並用localStorage儲存轉成string的JSON
        var todo = {
            state: state,
            BMI: BMI,
            weight: weight,
            height: height,
            buildDate: btYearMonthDay,
            stateColor: stateColor
        }
        console.log(todo);
        data.push(todo);
        updataList(data);
        localStorage.setItem('listData', JSON.stringify(data));

        //取完值後清除欄位
        clear();
    } else {
        alert('不是有效的數字');
        window.location.reload();
        clear();
    }
}

function updataList(items) {
    var str = '';
    var len = items.length;
    for (var i = 0; i < len; i++) {
        str += `<ul class="list-group border-0 border-orange py-3 d-flex flex-row justify-content-between list">
                    <li class="list-group-item border-0 border-start border-${items[i].stateColor} border-5">${items[i].state}</li>
                    <li class="list-group-item border-0"><span>BMI</span> ${items[i].BMI}</li>
                    <li class="list-group-item border-0"><span class="fs-6">weight </span>${items[i].weight} kg</li>
                    <li class="list-group-item border-0"><span>height</span> ${items[i].height} cm</li>
                    <li class="list-group-item border-0">${items[i].buildDate}</li>
                </ul>`
    }
    list.innerHTML = str;
}

function clear() {
    var clearHeight = document.querySelector('.height');
    var clearWeight = document.querySelector('.weight');
    clearHeight.value = '';
    clearWeight.value = '';
}

/* 判斷是否是數字 */
function isnumber(value) {
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
