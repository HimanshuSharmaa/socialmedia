export class SocialMedia {


    async UpdateProfile({ bio, countryCode, dob, firstName, lastName, location, phoneNumber }) {

        const accessToken = localStorage.getItem('accessToken')


        const UpdateProfileMsg = await fetch('http://localhost:8080/api/v1/social-media/profile', {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken} `
            },
            body: JSON.stringify({

                "bio": bio,
                "countryCode": countryCode,
                "dob": dob,
                "firstName": firstName,
                "lastName": lastName,
                "location": location,
                "phoneNumber": phoneNumber
            })
        }).then(respo => {
            return respo.json()
        }).then(respo => {
            
            return respo
        }).catch(error => { console.log(error) })



        return UpdateProfileMsg
    }



    async GetProfile() {

        const accessToken = localStorage.getItem('accessToken')

        const GetProfileMsg = await fetch('http://localhost:8080/api/v1/social-media/profile', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken} `
            }
        }).then(respo => {
            return respo.json()
        }).then(respo => {
            //   console.log(respo)
            return respo
        }).catch(error => { console.log(error) })


        return GetProfileMsg

    }


    async UploadCoverImage(file) {

        const accessToken = localStorage.getItem('accessToken')

        const formdata = new FormData

        formdata.append('coverImage', file);


        const UploadCoverImageMsg = fetch('http://localhost:8080/api/v1/social-media/profile/cover-image', {

            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'accept': 'application/json',
            },
            body: formdata
        }).then(respo => {
            return respo.json()
        }).then(respo => {
            // console.log(respo)
            return respo
        }).catch(error => { return error })

        // console.log(file.name, file.type)

        return UploadCoverImageMsg


    }


    async CreatePost(content, image, tags) {

        const accessToken = localStorage.getItem('accessToken')


        const formdata = new FormData

        formdata.append('content', content)
        formdata.append('images', image)

        tags.forEach((tag, ind) => {

            formdata.append(`tag[${ind}]`, tag)

        })

        const CreatePostMsg = fetch('http://localhost:8080/api/v1/social-media/posts', {

            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken} `
            },
            body: formdata
        }).then(respo => {
            return respo.json()
        }).then(respo => {
            // console.log(respo)
            return respo
        }).catch(error => {
            console.log(error)
        })

        return CreatePostMsg

    }



    async GetAllPosts() {

        const accessToken = localStorage.getItem('accessToken')
        
        const GetAllPostsMsg = await fetch('http://localhost:8080/api/v1/social-media/posts?page=1&limit=10', {

            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken} `
            }
        }).then(respo => {
            return respo.json()
        }).then(respo => {
            // console.log(respo)
            return respo
        }).catch(error => { console.log(error) })

        return GetAllPostsMsg

    }


    async GetPostbyId(postid) {

        const accessToken = localStorage.getItem('accessToken')

        const GetPostbyIdMsg = await fetch(`http://localhost:8080/api/v1/social-media/posts/${postid}`, {
            method: 'Get',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken} `
            }
        }).then(respo => {
            return respo.json()
        }).then(respo => {
            // console.log(respo)
            return respo
        }).catch(error => console.log(error))

        return GetPostbyIdMsg

    }



    async DeletePostbyId(postid) {

        const accessToken = localStorage.getItem('accessToken')

        const DeletePostbyId = await fetch(`http://localhost:8080/api/v1/social-media/posts/${postid}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken} `
            }
        }).then(respo => {
            return respo.json()
        }).then(respo => {
            // console.log(respo)
            return respo
        }).catch(error => console.log(error))

        return DeletePostbyId

    }



    async LikeUnlike(postid) {
        const accessToken = localStorage.getItem('accessToken')

        const LikeUnlikeMsg = await fetch(`http://localhost:8080/api/v1/social-media/like/post/${postid}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken} `
            }
        }).then(respo => {
            return respo.json()
        }).then(respo => {
            // console.log(respo)
            return respo
        }).catch(error => console.log(error))

        return LikeUnlikeMsg

    }


    async BookMark(postid) {

        const accessToken = localStorage.getItem('accessToken')

        const BookMarkMsg = await fetch(`http://localhost:8080/api/v1/social-media/bookmarks/${postid}`, {

            method: 'POST',
            headers: {
                'accept':'application/json',
                'Authorization': `Bearer ${accessToken} `
            }
        }).then(respo => {
            // console.log(respo)
            return respo.json()
        }).then(respo => { 
            // console.log(respo)
            return respo 
        }).catch(error => console.log(error))

        return BookMarkMsg

    }




    async AddComment(content,postid){

        const accessToken = localStorage.getItem('accessToken')

        const AddCommentMsg = await fetch(`http://localhost:8080/api/v1/social-media/comments/post/${postid}`,{

        method:'POST',
        headers:{
           'accept':'application/json' ,
            'Content-Type':'application/json' ,
            'Authorization': `Bearer ${accessToken} `

        },
        body:JSON.stringify({
            "content": content
        })

        }).then(respo => {
            // console.log(respo)
            return respo.json()
        }).then(respo => { 
            // console.log(respo)
            return respo 
        }).catch(error => console.log(error))

        return AddCommentMsg


    }


    async GetComment(postid){


        const accessToken = localStorage.getItem('accessToken')

        const GetCommentMsg = await fetch(`http://localhost:8080/api/v1/social-media/comments/post/${postid}?page=1&limit=100`,{

        method:'GET',
        headers:{
            'accept':'application/json' ,
            'Authorization': `Bearer ${accessToken} `
        }

        }).then(respo => {
            // console.log(respo)
            return respo.json()
        }).then(respo => { 
            // console.log(respo)
            return respo 
        }).catch(error => console.log(error))


        return GetCommentMsg

    }


    async DeleteComment(postid){

        const accessToken = localStorage.getItem('accessToken')

        const DeleteCommentMsg = await fetch(`http://localhost:8080/api/v1/social-media/comments/${postid}`,{

        method:'DELETE',
        headers:{
            'accept':'application/json',
            'Authorization': `Bearer ${accessToken}`

        }
            
        }).then(respo => {
            // console.log(respo)
            return respo.json()
        }).then(respo => { 
            // console.log(respo)
            return respo 
        }).catch(error => console.log(error))

        return DeleteCommentMsg

    }

    async LikeUnlikeComment(postid){

        const accessToken = localStorage.getItem('accessToken')

        const LikeUnlikeCommentMsg = await fetch( `http://localhost:8080/api/v1/social-media/like/comment/${postid}`,{
        method:'POST',
        headers:{
            'accept':'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
        }).then(respo => {
            // console.log(respo)
            return respo.json()
        }).then(respo => { 
            // console.log(respo)
            return respo 
        }).catch(error => console.log(error))

        return LikeUnlikeCommentMsg


    }



    async UpdateComment(content,postid){

        const accessToken = localStorage.getItem('accessToken')

        const UpdateCommentMsg = await fetch(` 'http://localhost:8080/api/v1/social-media/comments/${postid}`,{

        method:'PATCH',
        headers:{
           'accept':'application/json' ,
            'Content-Type':'application/json' ,
            'Authorization': `Bearer ${accessToken} `

        },
        body:JSON.stringify({
            "content": {content}
        })

        }).then(respo => {
            // console.log(respo)
            return respo.json()
        }).then(respo => { 
            // console.log(respo)
            return respo 
        }).catch(error => console.log(error))

        return UpdateCommentMsg


    }


    async GetMyPosts(){


        const accessToken = localStorage.getItem('accessToken')

        const GetMyPosts = await fetch('http://localhost:8080/api/v1/social-media/posts/get/my?page=1&limit=100',{
            method:'GET',
            headers:{
                'accept':'application/json' ,
                'Authorization': `Bearer ${accessToken} `

            }
        }).then(respo => {
            return respo.json()
        }).then(respo => { 

            return respo 
        }).catch(error => console.log(error))

        return GetMyPosts


    }




    async GetPostsbyUsername(username){

        const GetPostsbyUsernameMsg = await fetch(`http://localhost:8080/api/v1/social-media/posts/get/u/${username}?page=1&limit=100`,{
            method:'GET',
            headers:{
                'accept':'application/json' ,
                // 'Authorization': `Bearer ${accessToken} `

            }
        }).then(respo => {
            return respo.json()
        }).then(respo => { 

            return respo 
        }).catch(error => console.log(error))

        return GetPostsbyUsernameMsg


    }
    


    async BookMarkPosts(){


        const accessToken = localStorage.getItem('accessToken')

        const BookMarkPostsMsg = await fetch('http://localhost:8080/api/v1/social-media/bookmarks?page=1&limit=5',{
            method:'GET',
            headers:{
                'accept':'application/json' ,
                'Authorization': `Bearer ${accessToken} `
            }
        }).then(respo => {
            console.log(respo)
            return respo.json()
        }).then(respo => { 
            console.log(respo)
            return respo 
        }).catch(error => console.log(error))

        return BookMarkPostsMsg


    }


    async Getprofilebyusername(username){

        const accessToken = localStorage.getItem('accessToken')

        const GetprofilebyusernameMsg = fetch( `http://localhost:8080/api/v1/social-media/profile/u/${username}`,{
            method:'GET',
            headers:{
                'accept':'application/json',
                'Authorization': `Bearer ${accessToken} `
            }
        }).then(respo => {
            return respo.json()
        }).then(respo => { 
            console.log(respo)
            return respo 
        }).catch(error => console.log(error))

        return  GetprofilebyusernameMsg




    }
    






}

const socialmedia = new SocialMedia()
export default socialmedia;