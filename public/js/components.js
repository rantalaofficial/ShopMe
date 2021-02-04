class Components {
    static Card(title, description, content) {

        return `
        <div class="col m6 s12">
            <div class="card blue-grey lighten-1">
                <div class="card-content white-text">
                    <span class="card-title">${title}</span>
                    ${content}
                </div>
            </div>
        </div>
        `
    }

    static Checkbox(label, checkable = true) {
        return `
        <label>
        <input type="checkbox" class="filled-in" ${checkable ? '' : 'disabled'} checked="checked" />
        <span>${label}</span>
        </label>
        `
    }
}

