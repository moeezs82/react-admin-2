import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

const ProductList = () => {
  // const [data, setData] = useState(productRows);

  const dispatch = useDispatch();

  const product = useSelector(state=>state.product.products)


  useEffect(()=>{
    getProducts(dispatch)
  }, [dispatch])

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };
  const handleDelete = (id) => {
    deleteProduct(id, dispatch)
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            <img src={params.row.img} alt="" className="productListImg" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "in_stock", headerName: "Stock", width: 200, renderCell: (params) => {
      return(
        <>{params.row.in_stock === 1 ? "Available" : "Out of Stock"}</>
      )
    } },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    {
      field: "price",
      headerName: "Price",
      width: 190,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/products/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        disableSelectionOnClick
        rows={product}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default ProductList;
