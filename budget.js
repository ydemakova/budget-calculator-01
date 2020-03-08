
// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }

    var Income = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }

    var calculateTotal = function (type) {
        var sum = 0
        data.allItems[type].forEach(function (cur) {
            sum = sum + cur.value
        })

        data.totals[type] = sum
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percentage: -1

    }

    return {
        addItem: function (type, des, val) {
            var newItem, ID

            //Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            // Push it inro our data structure
            data.allItems[type].push(newItem)

            // Return the new element
            return newItem
        },

        calculateBudget: function () {

            // calculate total income and expenses
            calculateTotal('exp')
            calculateTotal('inc')

            // calculate teh budget: income-expenses
            data.budget = data.totals.inc - data.totals.exp

            // calculate the percentage of income that we spent
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)

        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data)
        }
    }

}())




// UI CONTROLLER
var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },

        addListItem: function (obj, type) {
            var html, newHTML, element
            // Create HTML string with placeholder text

            if (type === 'inc') {
                element = DOMStrings.incomeContainer

                // html =  ADD HERE;
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer
                // html = ADD HERE;
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj, id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentElement('beforeend', newHtml)

        },

        clearFields: function () {
            var fields, fieldsArr

            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue)
            fieldsArr = Array.prototype.slice.call(fields)
            fieldsArr.forEach(function (current, index, array) {
                current.value = ""
            })

            fieldsArr[0].focus()
        },

        getDOMStrings: function () {
            return DOMStrings
        }
    }
})()


// GLOBAL APP CONTROLLER 
var controller = function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings()

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem()
            }
        })
    }

    var updateBudget = function () {

    }
}


    //CREATE INCOME AND EXPENSE FUNCTION CONSTRUCTORS
