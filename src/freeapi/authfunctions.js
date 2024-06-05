export class Authentication {


    async CreateAccount({ email, password, role, username }) {


        const CreateAccountMsg = await fetch(`http://localhost:8080/api/v1/users/register`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "role": role,
                "username": username
            })
        })
            .then(respo => {
                return respo.json()
            }).then(respo => {
                return respo
            })
            .catch(error => { console.log(error) })



        return CreateAccountMsg


    }





    async LoginAccount({ username, password }) {


        const LoginAccountMsg = await fetch(`http://localhost:8080/api/v1/users/login`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "username": username
            })
        })
            .then(respo => {
                return respo.json()
            }).then(respo => {
                return respo
            })
            .catch(error => { console.log(error) })


        return LoginAccountMsg


    }







    async GetCurrentAccount(accessToken) {


        const GetCurrentAccountMsg = await fetch('http://localhost:8080/api/v1/users/current-user', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken} `

            }
        }).then(respo => {
            return respo.json()
        }).then(respo => {
            return respo
        })
            .catch(error => { console.log(error) })

        return GetCurrentAccountMsg

    }





    async LogOutAccount(accessToken) {


        const LogoutMsg = await fetch('http://localhost:8080/api/v1/users/logout', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken} `
            },
            body: ''
        })
            .then(respo => {
                return respo.json()
            }).then(respo => {
                return respo
            })
            .catch(error => { console.log(error) })

        return LogoutMsg

    }


    async ChangePassword({ oldPassword, newPassword }) {

        const accessToken = localStorage.getItem('accessToken')

        const ChangePasswordMsg = await fetch('http://localhost:8080/api/v1/users/change-password', {
            method: 'POST',
            headers: {

                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken} `
            },
            body: JSON.stringify({
                "newPassword": newPassword,
                "oldPassword": oldPassword
            })
        })
            .then(respo => {
                return respo.json()
            }).then(respo => {
                return respo
            })
            .catch(error => { console.log(error) })


        return ChangePasswordMsg

    }


    async UploadAvatar(file) {

        const accessToken = localStorage.getItem('accessToken')

        const formdata = new FormData


        formdata.append('avatar', file);


        const UploadAvatarMsg = await fetch(`http://localhost:8080/api/v1/users/avatar`, {

            method: 'PATCH',
            headers: {

                'Authorization': `Bearer ${accessToken}`,
                'accept': 'application/json',
            },
            body: formdata
        }).then(respo => {
            console.log(respo)
            return respo.json()
        }).then(respo => {
            console.log(respo)
            return respo
        }).catch(error => { return error })

        console.log(file.name, file.type)

        return UploadAvatarMsg

    }





}



const authfunctions = new Authentication()

export default authfunctions