import { Col, Row, Card } from 'antd'
import React, { useState } from 'react'
import ProductTable from './ProductTable'
import { Input, Button, Modal } from 'antd'
import { AddEditProductDetail } from './AddEditProductDetail';
const { Search } = Input;

export const AdminProduct = () => {
    const onSearch = (value) => console.log(value);
    const [showForm, setShowForm] = useState(false);
    const [toggleAddEdit, setToggleAddEdit] = useState(true);
    const [editId, setEditId] = useState(null)

    const handleCancel = () => {
        setShowForm(false);
        toggleAddEdit ? setToggleAddEdit(false) : setToggleAddEdit(true)
    };

    const displayForm = () => {
        showForm ? setShowForm(false) : setShowForm(true)
    }

    return (
        <>
            <Row justify='space-between'>
                <Col>
                    <Search
                        placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        size="large"
                    />
                </Col>

                <Col>
                    <Button type="primary" onClick={displayForm}>Add new products</Button>
                    {showForm &&
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
                                setEditId={setEditId} />
                        </Modal>
                    }
                </Col>
            </Row>

            <Card className='admin-product-card'>
                <ProductTable showForm={setShowForm}
                    setToggleAddEdit={setToggleAddEdit}
                    toggleAddEdit={toggleAddEdit}
                    setEditId={setEditId} />
            </Card>
        </>
    )
}
