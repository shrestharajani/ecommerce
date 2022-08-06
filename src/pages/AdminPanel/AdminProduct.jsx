import { Col, Row, Card } from "antd";
import React, { useState } from "react";
import ProductTable from "./ProductTable";
import { Input, Button, Modal } from "antd";
import { AddEditProductDetail } from "./AddEditProductDetail";
import { useSelector } from "react-redux";
const { Search } = Input;

export const AdminProduct = () => {
  const [showForm, setShowForm] = useState(false);
  const [toggleAddEdit, setToggleAddEdit] = useState(true);
  const [editId, setEditId] = useState(null);
  const [searchItem, setSearchItem] = useState("");

  const handleCancel = () => {
    setShowForm(false);
    toggleAddEdit ? setToggleAddEdit(false) : setToggleAddEdit(true);
  };

  const displayForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  const onSearch = (value) => {
    setSearchItem(value);
  };

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            size="large"
          />
        </Col>

        <Col>
          <Button type="primary" onClick={displayForm}>
            Add new products
          </Button>
          {showForm && (
            <Modal
              title={toggleAddEdit ? "Add new Products" : "Edit new Products"}
              visible={showForm}
              onCancel={handleCancel}
              footer={null}
            >
              <AddEditProductDetail
                showForm={setShowForm}
                setToggleAddEdit={setToggleAddEdit}
                toggleAddEdit={toggleAddEdit}
                editId={editId}
                setEditId={setEditId}
              />
            </Modal>
          )}
        </Col>
      </Row>

      <Card className="admin-product-card">
        <ProductTable
          showForm={setShowForm}
          searchItem={searchItem}
          setToggleAddEdit={setToggleAddEdit}
          toggleAddEdit={toggleAddEdit}
          setEditId={setEditId}
        />
      </Card>
    </>
  );
};
