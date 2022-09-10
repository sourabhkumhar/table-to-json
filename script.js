const submit = document.getElementById('submit')
const tbody = document.getElementById('table-body');

var obj = [];

submit.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.getElementById('form');
    const formData = new FormData(form);

    var jsonData = {};
    let empty = false;

    for (const [key, value] of formData) {
        if (value === "") {
            empty = true;
        }
        else {
            jsonData[key] = value;
        }
    }
    if (!empty) {
        obj.push(jsonData)

        tbody.innerHTML += `<tr id=${formData.get('id')}>
            <td>${formData.get('id')}</td>
            <td>${formData.get('name')}</td>
            <td>${formData.get('phone')}</td>
            <td>${formData.get('email')}</td>
            <td><span class="material-symbols-outlined deleteRow">
            delete
            </span></td>
        </tr>`

        document.getElementById('json-data').innerHTML = syntaxHighlight(obj)

        form.reset();
        document.getElementById('id').value = Number(formData.get('id')) + 1;
    }


    // Delete Row
    const del = document.querySelectorAll('.deleteRow');
    del.forEach(row => {
        row.addEventListener('click', (e) => {
            const rowId = e.target.parentNode.parentNode.id
            console.log(rowId);
            delete obj[rowId - 1]

            document.getElementById('json-data').innerHTML = syntaxHighlight(obj)

            document.getElementById(rowId).innerHTML = "";
        });
    });
})



// To pretty Javascript
function syntaxHighlight(obj) {
    if (typeof obj != 'string') {
        obj = JSON.stringify(obj, null, 2);
    }
    obj = obj.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return obj.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?,)/g, function (match) {
        var cls = 'token number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'token string-property property';
            } else {
                cls = 'token string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'token boolean';
        } else if (/null/.test(match)) {
            cls = 'token null';
        } else if (/0-9/.test(match)) {
            cls = 'token number';
        }
        return '<span class="' + cls + '">' + match + '</span>';
        // return match;
    })
}