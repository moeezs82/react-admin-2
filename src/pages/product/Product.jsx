import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethod";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const [pStats, setPStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(`order/income/${productId}`);
        res.data.income["group"].map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item.date - 1], Sales: item.sum },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product.id === parseInt(productId))
  );

  var product1 = null;

  const [inputs, setInputs] = useState({
    title: product.title,
    price: product.price,
    desc: product.desc,
    categories: product.categories,
    color: product.color,
    size: product.size,
    in_stock: product.in_stock,
  });

  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // console.log(inputs);

  const handleClick = (e) => {
    e.preventDefault();
    if (file) {
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
            product1 = { ...inputs, img: downloadURL };
            updateProduct(product1, dispatch);
          });
        }
      );
    } else {
      product1 = { ...inputs, img: product.img };
      updateProduct(product1, product.id, dispatch);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/products/new">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product1 ? product1.img : product.img} alt="" className="productInfoImg" />
            <span className="productName">{product1 ? product1.title :product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product.id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            {/* <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">yes</span>
            </div> */}
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product1? product1.in_stock : product.in_stock === 1 ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              defaultValue={product.title}
              name="title"
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              defaultValue={product.desc}
              name="desc"
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              type="number"
              defaultValue={product.price}
              name="price"
              onChange={handleChange}
            />
            <label>Categories</label>
            <input
              type="text"
              defaultValue={product.categories}
              name="categories"
              onChange={handleChange}
            />
            <label>Color</label>
            <input
              type="text"
              defaultValue={product.color}
              name="color"
              onChange={handleChange}
            />
            <label>Size</label>
            <input
              type="text"
              defaultValue={product.size}
              name="size"
              onChange={handleChange}
            />

            <label>In Stock</label>
            <select name="in_stock" id="idStock" onChange={handleChange}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {/* <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select> */}
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={file ? URL.createObjectURL(file) : product.img}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
