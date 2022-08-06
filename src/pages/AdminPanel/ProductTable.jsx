import { Space, Spin, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  getProduct,
  deleteProduct,
  getSingleProduct,
} from "../../redux/actions/productActions";

const ProductTable = ({
  showForm,
  setToggleAddEdit,
  setEditId,
  searchItem,
}) => {
  const products = useSelector((state) => state.productReducer.product_details);
  const loading = useSelector((state) => state.productReducer.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const productDelete = (id) => {
    if (window.confirm("Are you sure you want to delete contact?")) {
      dispatch(deleteProduct(id));
      toast.success("Product deleted successfully", {
        icon: "😄",
      });
      dispatch(getProduct());
    }
  };

  const productEdit = (id) => {
    dispatch(getSingleProduct(id));
    setEditId(id);
    showForm(true);
    setToggleAddEdit(false);
  };

  const columns = [
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Product Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Product Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, product) => (
        <Space size="middle">
          <EditOutlined
            style={{ cursor: "pointer", color: "green" }}
            onClick={() => productEdit(product.key)}
          />
          <DeleteOutlined
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => productDelete(product.key)}
          />
        </Space>
      ),
    },
  ];

  const product = products
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchItem) ||
        item.brand.toLowerCase().includes(searchItem) ||
        item.type.toLowerCase().includes(searchItem)
    )
    .map((product) => ({
      key: product.id,
      image: (
        <div className="product-table-image">
          <img src={product.image} alt="not found" />
        </div>
      ),
      name: product.name,
      brand: product.brand,
      type: product.type,
      description: product.description,
      price: product.price,
      stock: product.stock,
    }));

  return (
    <>
      {loading ? (
        <Spin
          size="large"
          style={{ display: "flex", justifyContent: "center" }}
        />
      ) : (
        <Table columns={columns} dataSource={product} />
      )}
    </>
  );
};

export default ProductTable;
