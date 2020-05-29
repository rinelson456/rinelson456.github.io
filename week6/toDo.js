export class toDo {
    name = ""
    month = ""
    day = ""
    year = ""

    constructor(name, date) {
        this.name = name
        this.date = date
        console.log(this.name);
    }

    renderToDo() {
        const item = document.createElement("div");

        console.log(this.name)

        if (this.name === undefined) {
            this.name = "Nothing to Do!"
            item.innerHTML =
                ` <div class="toDo">
                <h2 class="toDoName">${this.name}</h2>
            </div>`;
        } else {
            item.innerHTML =
                ` <div class="toDo">
                <h2 class="toDoName">${this.name}</h2>
                <div class="completeDate">
                    <div>
                        <h3>Complete by</h3>
                        <p>${this.month}</p>
                    </div>
                </div>
            </div>`;
        }


        return item;
    }

}