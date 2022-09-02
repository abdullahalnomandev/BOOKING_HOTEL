import axios from "axios";

const reRedderLocalStorage =()=>{

  console.log('hello');
}

const cloudinaryUpload = async (e) => {
  try {
    console.log(e.target.files[0]);
    const imageFile = e.target.files[0];
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "service");
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
        data
      )
      .then((res) => {
        console.log(res.data.url);
          localStorage.setItem("image-url",res.data.url);

          reRedderLocalStorage()

      });
  } catch (errors) {
    console.log(errors);
  }
};

export default cloudinaryUpload;
