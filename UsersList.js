import define from "preact-custom-element";
import { html, Component } from 'htm/preact';

class UsersList extends Component {
    state = {
        originalData: [],
        data: [],
        searchString: ''
    };

    onKeyDown = (event) => {
        if (event.keyCode === 8) {
            this.resetState(event);
        }
    };

    resetState = (event) => {
        this.setState(
            {
                data: this.state.originalData.filter(user => user.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1),
                searchString: event.target.value
            }
        );
    }
    handleChange = event => {
        this.resetState(event);
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network error');
                };
                return response.json();
            })
            .then(userData => {
                this.setState(() => {
                    return { data: userData, originalData: userData }
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render(props, state) {
        return html`
        <style>
            * {
            font-size: 1em;
            }

            .simple-table {
                border: solid 1px #DDEEEE;
                border-collapse: collapse;
                border-spacing: 0;
                font: normal 13px Arial, sans-serif;
            }
            .simple-table thead th {
                background-color: #DDEFEF;
                border: solid 1px #DDEEEE;
                color: #336B6B;
                padding: 10px;
                text-align: left;
                text-shadow: 1px 1px 1px #fff;
            }
            .simple-table tbody td {
                border: solid 1px #DDEEEE;
                color: #333;
                padding: 10px;
                text-shadow: 1px 1px 1px #fff;
            }
            .message {
                font-size: 1.5rem;
                padding:50px;
            }
        </style>
        <div>
            <div>
                <input type="text" onKeyDown="${this.onKeyDown}" onInput="${this.handleChange}" value="${state.data.searchString}" placeholder="Filter by Name"/>
            </div>
            <br></br>
        <table class="simple-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
        
            ${(state.data.length === 0) ? html`<tr><td colspan="2"><span class="message"> No results found!</span></td></tr>` : state.data.map((user) => html`<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>`)}
        </tbody>
        </table>
        </div>`;
    }
}

define(UsersList, "users-list", [], { shadow: true });
