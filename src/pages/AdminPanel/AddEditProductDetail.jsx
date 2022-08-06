import { Input, Select, Button, Row, Spin } from "antd";
import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  editProduct,
  getProduct,
} from "../../redux/actions/productActions";
import { toast } from "react-toastify";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";

const { Option } = Select;

export const AddEditProductDetail = ({
  showForm,
  setToggleAddEdit,
  toggleAddEdit,
  setEditId,
  editId,
}) => {
  const [state, setState] = useState({
    id: Date.now(),
    image: null,
    name: "",
    description: "",
    brand: "",
    type: "",
    price: "",
    stock: "",
    quantity: 1,
  });

  const [isLoading, setIsLoading] = useState(false);

  const singleProduct = useSelector(
    (state) => state.productReducer.single_product
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setState({ ...singleProduct });
  }, [singleProduct]);

  const { name, brand, type, description, price, image, stock } = state;

  const addEditProduct = (e) => {
    e.preventDefault();
    if (!name || !brand || !stock || !price) {
      toast.error("Required field cannot be empty", {
        icon: "😠",
      });
    } else if (!toggleAddEdit) {
      toast.success("Data edited successfully", {
        icon: "😄",
      });
      dispatch(editProduct(editId, state));
      showForm(false);
      setToggleAddEdit(false);
      setEditId(null);
      setState({});
      setTimeout(() => {
        dispatch(getProduct());
      }, 2000);
    } else {
      toast.success("Data added successfully", {
        icon: "😄",
      });
      dispatch(addProduct(state));
      setState({});
      showForm(false);
      dispatch(getProduct());
      setToggleAddEdit(true);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value, quantity: 1 });
  };

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `product-images/${Date.now()}-${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(uploadProgress);
      },
      (error) => {
        console.log(error);
        alert("Error while uploading image");
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setState({ ...state, image: downloadURL });
          setIsLoading(false);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, image);
    deleteObject(deleteRef).then(() => {
      setState({ ...state, image: null });
      setIsLoading(false);
    });
  };

  const handleReset = () => {
    setState({});
  };

  return (
    <form onSubmit={addEditProduct} className="product-form">
      <Row justify="center">
        <div className="image">
          {isLoading ? (
            <Spin className="loading" />
          ) : (
            <>
              {!image ? (
                <>
                  <label className="upload">
                    <div className="upload-image">
                      <CloudUploadOutlined />
                      <p style={{ color: "silver" }}>Upload Product</p>
                    </div>
                    <input
                      type="file"
                      name="image"
                      value={image || ""}
                      accept="image/*"
                      onChange={uploadImage}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="upload flex">
                    <img
                      src={image}
                      alt="not found"
                      style={{ maxWidth: "100%" }}
                    />
                    <DeleteOutlined
                      className="image-delete"
                      style={{ color: "red" }}
                      onClick={deleteImage}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Row>
      <Row justify="center">
        <Input
          placeholder="Enter product name"
          onChange={handleInputChange}
          name="name"
          value={name || ""}
        />
      </Row>
      <Row justify="space-around">
        <Select
          placeholder="Brand"
          style={{ width: 130 }}
          onChange={(e) => {
            setState({ ...state, brand: e });
          }}
          label="brand"
          name="brand"
          value={brand || ""}
        >
          <Option value="beer">Beer</Option>
          <Option value="rum">Rum</Option>
          <Option value="vodka">Vodka</Option>
          <Option value="whisky">Whiskey</Option>
          <Option value="wine">Wine</Option>
          <Option value="brandy">Brandy</Option>
          <Option value="kodo">Kodo</Option>
        </Select>
        <Select
          placeholder="Type of product"
          style={{ width: 130 }}
          onChange={(e) => {
            setState({ ...state, type: e });
          }}
          name="type"
          label="type"
          value={type || ""}
        >
          <Option value="imported">Imported</Option>
          <Option value="domestic">Domestic</Option>
        </Select>
      </Row>
      <Row>
        <Input.TextArea
          placeholder="Enter the product description"
          onChange={handleInputChange}
          name="description"
          value={description || ""}
        />
      </Row>
      <Row justify="space-around">
        <Input
          style={{ width: 140 }}
          placeholder="Price"
          onChange={handleInputChange}
          name="price"
          prefix="Rs"
          value={price || ""}
        />
        <Input
          style={{ width: 140 }}
          placeholder="Stock"
          onChange={handleInputChange}
          name="stock"
          value={stock || ""}
        />
      </Row>
      <Row justify="space-evenly">
        <Button key="reset" onClick={handleReset}>
          Reset
        </Button>
        <Button
          disabled={!state}
          key="submit"
          style={
            toggleAddEdit
              ? { background: "green", color: "white" }
              : { background: "yellow" }
          }
          onClick={addEditProduct}
        >
          {toggleAddEdit ? "Add Product" : "Edit Product"}
        </Button>
      </Row>
    </form>
  );
};
