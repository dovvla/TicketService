Vue.component('usersadmin', {
    data: function () {
        return {
            users: [],
            sfs: {}
        }
    },
    template: `
    <div width="80%">
    <h3>
    All tickets
</h3>
    <table class="table table-striped table-dark">
        <thead>
            <tr>
                <th scope="col">Username</th>
                <th scope="col">Type</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Points</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in this.users" :key="user.uuid">
                <td> {{user.username}} </td>
                <td> {{user.userRole}} </td>
                <td> {{user.firstName}} </td>
                <td> {{user.lastName}} </td>
                <td> {{user.points}} </td>

            </tr>
        </tbody>
    </table>

</div>
    `,
    methods: {
        cancel: function () {

        }
    },
    mounted() {
        axios.get('users/allForAdmin')
            .then(res => {
                this.users = res.data;
                this.users.forEach(user => {
                    if (user.userRole != 'CLIENT') {
                        user.points = 'X';
                    }
                });
            })
            .catch(err => {
                console.error(err);
            })
    }
})