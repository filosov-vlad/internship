
var fieldWidth = 16;
var fieldHeight = 16;

var field = new Array(fieldWidth * fieldHeight).fill(null).map((_, i) => {
    let cell = {
        check: false,
        flag: false,
        bomb: Math.random() < 0.1,
        neighbords: [],
        x: i % fieldHeight,
        y: i / fieldHeight | 0
    };

    return cell;
});

field.forEach((cell) => {
    [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]].forEach((step) => {
        let pnx = cell.x + step[0];
        let pny = cell.y + step[1];
        if (pnx >= 0 && pnx < fieldWidth && pny >= 0 && pny < fieldHeight) {
            cell.neighbords.push(field[pny * fieldWidth + pnx]);
        }
    });
});

fieldElement.innerHTML = field.map( (cell) => `<span class="cell"></span>` ).join("");
fieldElement.style.width = fieldWidth * 10 + "px";

Array.from(fieldElement.children).forEach((elementCell, i) => {
    elementCell.cell = field[i];
    elementCell.cell.element = elementCell;
});

fieldElement.addEventListener("click", event => {
    let fill = (cell) => {
        if (!cell.check) {
            cell.check = true;
            let num = cell.neighbords.reduce((p, c) => p + c.bomb, 0);
            if (num > 0) {
                cell.element.innerText = num;
                cell.element.className = ["cell", "num"].join(" ");
            } else {
                cell.element.className = ["cell", "check"].join(" ");
                cell.neighbords.forEach(fill);
            }
        }
    };
    if (event.target.cell.bomb) {
        field.forEach( cell => {
            if (cell.bomb) {
                cell.element.className = ["cell", "bomb"].join(" ");
            }
        })
        alert("проиграл");
    } else {
        fill(event.target.cell);
    }
    return false;
});



function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);

    return {
        'total': t,

        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);

    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);


        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + (40 * 60 * 1000)); // for endless timer
initializeClock('countdown', deadline);