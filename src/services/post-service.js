import { privateAxios } from "./helper";
import { myAxios } from "./helper";
//create post function
export const createPost = (postData) => {
  //   console.log(postData);
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

//get all posts

export const loadAllPosts = (pageNumber, pageSize) => {
  console.log(pageNumber,pageSize)
  return myAxios
    .get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
    .then((response) => response.data);
};

//get by catagory
export const loadPostByCat = (categoryId) => {
   console.log(categoryId);
  return myAxios
  .get(`/posts/cat/${categoryId}`)
  .then((response) => response.data);
};

//load single post of given id
export const loadPost = (postId) => {
  return myAxios.get("/posts/" + postId).then((reponse) => reponse.data);
};


export const createComment=(comment,postId)=>{
  return privateAxios.post(`/post/${postId}/comments`,comment)
}

//upload post banner

export const uploadPostImage=(image,postId)=>{
  let formData=new FormData();
  formData.append("image",image);
  return privateAxios.post(`/upload/image/${postId}`,formData,{
    headers:{
      'Content-Type':'multipart/form-data'
    }
  })
  .then((response)=>response.data)
};

export const getPostByUserId = (userId) => {
  console.log(userId);
 return myAxios
 .get(`/user/${userId}/posts`)
 .then((response) => response.data);
};



export const deletePostById = (postId) => {
  console.log(postId);
  return privateAxios.delete(`/posts/${postId}`)
};


