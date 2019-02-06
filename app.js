var monthlyCalendar = (function IFFE() {
    var WEEK_DAYS = {
        EN: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        PT: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']
    }
 
    /*
    Find the week day for the January of 2019:
    getFirstWeekDayOfTheMonth(2019, 0);
    */
    function getFirstWeekDayOfTheMonth(year, month) {
        return new Date(year, month).getDay();
    }
 
    /*
    Find how many days have a specific month,
    in this case February of 2019:
    howManyDaysInAMonth(2019, 1)
    */
    function howManyDaysInAMonth(year, month) {
        return 32 - new Date(year, month, 32).getDate();
    }
 
    function getTableHeader(language) {
        return `<thead>
                <tr>
                    ${WEEK_DAYS[language].map(
            day => `<th>${day}</th>`).join('')
            }
                </tr>
            </thead>`;
    }
 
    function createTableDataWithValue(currentIndex) {
        var node = document.createTextNode(currentIndex);
        var tableData = document.createElement('td');
        tableData.appendChild(node);
        return tableData;
    }
 
    function getTableBodyByMonth(year, month) {
        var numberOfDaysInCurrentMonth = howManyDaysInAMonth(year, month);
        var weeklyCounter = getFirstWeekDayOfTheMonth(year, month);
        var tableBody = document.createElement('tbody');
        var row = document.createElement('tr');
        var numberOfSpacesAvaiableInCurrentRow = 7;
 
        // deal with the first row
        while (weeklyCounter != 0) {
            row.appendChild(createTableDataWithValue(""));
            weeklyCounter--;
            numberOfSpacesAvaiableInCurrentRow--;
        }
 
        // deal with middle rows
        for (var i = 1; i <= numberOfDaysInCurrentMonth; i++) {
            row.appendChild(createTableDataWithValue(i));
 
            if (numberOfSpacesAvaiableInCurrentRow === 1) {
                tableBody.appendChild(row);
                row = document.createElement('tr');
                numberOfSpacesAvaiableInCurrentRow = 8;
            }
            numberOfSpacesAvaiableInCurrentRow--;
        }
 
        // deal with the last row
        if (row.childElementCount > 0) {
            while (row.childElementCount !== 7) {
                row.appendChild(createTableDataWithValue(""));
            }
            tableBody.appendChild(row);
        }
 
        return tableBody;
    }
 
    function buildCalendar(language, year, month) {
        var table = document.createElement('table');
        table.id = 'table';
        table.innerHTML = getTableHeader(language);
        table.appendChild(getTableBodyByMonth(year, month));
        document.body.appendChild(table);
        addListerners();
    }
 
    function addListerners() {
        table.addEventListener('click', function (e) {
            if (e.target.tagName.toLowerCase() === 'td') {
                console.log(e.target.innerText);
            }
        });
    }
 
    return {
        buildCalendar: buildCalendar
    }
})();