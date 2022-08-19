import { Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/actions/userActions";

export const AdminUser = () => {
  const users = useSelector((state) => state.userReducer.user_details);
  const loading = useSelector((state) => state.productReducer.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "f_name",
      key: "f_name",
    },
    {
      title: "Last Name",
      dataIndex: "l_name",
      key: "l_name",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const user = users.map((user) => ({
    key: user.id,
    f_name: user.first_name,
    l_name: user.last_name,
    contact: user.phone_number,
    company: user.company,
    address: user.address,
  }));

  return (
    <>
      {loading ? (
        <Spin
          size="large"
          style={{ display: "flex", justifyContent: "center" }}
        />
      ) : (
        <>
          <h2>User Details</h2>
          <Table columns={columns} dataSource={user} />
        </>
      )}
    </>
  );
};
