import "./newProduct.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({
    title: null,
    price: null,
    desc: null,
    categories: null,
    color: null,
    size: null,
    in_stock: 1,
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  // const [categories, setCategories] = useState([]);

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (
      inputs["title"] &&
      inputs["price"] &&
      inputs["desc"] &&
      inputs["categories"] &&
      inputs["color"] &&
      inputs["size"] &&
      inputs["in_stock"] &&
      file
    ) {
      setError(null);
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = {...inputs, img: downloadURL};
            addProduct(product, dispatch)
          });
        }
      );
      e.target.reset();
    } else {
      setError("All fields are required");
    }
  };


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="$"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            name="categories"
            placeholder="jeans, skirts"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder="black, white"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            type="text"
            name="size"
            placeholder="S, L, XL"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          {/* <input type="text" placeholder="123" /> */}
          <select name="in_stock" onChange={handleChange}>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div>{error && <span style={{ color: "red" }}>{error}</span>}</div>
        {/* <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button className="addProductButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
