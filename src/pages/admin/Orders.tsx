/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ref as databaseRef, off, onValue, remove } from "firebase/database";
import { db } from "../../firebase";
import { ordersType } from "../../types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link, useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Product Name",
    flex: 2,
  },
  {
    field: "price",
    headerName: "Price (DHS)",
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
  },
  {
    field: "imageURL",
    headerName: "Product Image",
    flex: 1,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Image"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    ),
  },
  {
    field: "name",
    headerName: "Client Name",
    flex: 1,
  },
  {
    field: "city",
    headerName: "Client City",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Client Phone",
    flex: 1,
  },
  {
    field: "address",
    headerName: "Client Address",
    flex: 1,
  },
];

export default function Orders() {
  const [rows, setRows] = useState<ordersType[]>([]);
  const navigate = useNavigate();

  const deleteOrder = async (orderId: string) => {
    const itemsRef = databaseRef(db, "purchase/");

    // Get the data matching the query
    onValue(itemsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.orderId === orderId) {
          const itemKey = childSnapshot.key;

          if (!itemKey) {
            console.error("Item key not found.");
            return;
          }
          const itemRef = databaseRef(db, "purchase/" + itemKey);

          remove(itemRef)
            .then(() => {
              toast.success("Order deleted successfully");
            })
            .catch((err) => {
              console.error("Error deleting product:", err);
            });
        }
      });
    });
  };

  const getOrderKey = (orderId: string) => {
    const itemsRef = databaseRef(db, "purchase/");

    // Get the data matching the query
    onValue(itemsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.orderId === orderId) {
          const itemKey = childSnapshot.key;

          if (!itemKey) {
            console.error("Item key not found.");
            return;
          }

          navigate(`/order/${itemKey}`);
        }
      });
    });
  };

  useEffect(() => {
    const dbRef = databaseRef(db, "purchase/");
    onValue(dbRef, (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }

      const data = snapshot.val();
      const ordersArray = Object.values(data);
      const filteredData: ordersType[] | any[] = ordersArray.filter(
        (item: unknown) => typeof item === "object"
      );

      setRows(filteredData);
    });

    return () => {
      off(dbRef);
    };
  }, [rows]);

  return (
    <Box sx={{ height: 400, width: "97%", mx: 3, mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ color: "#000", fontSize: 18, mb: 3 }}>
          Orders
        </Typography>
        <Link to={"/admin"} className="btn btn-primary text-white">
          Return to dashboard
        </Link>
      </Box>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.orderId}
        columns={[
          ...columns,
          {
            field: "delivered",
            headerName: "Order State",
            renderCell: (params) => (
              <div>
                <p
                  className={
                    params.value
                      ? "text-green-500 font-semibold"
                      : " text-red-500 font-semibold"
                  }
                >
                  {params.value === true ? "Delivered" : "Not Delivered"}
                </p>
              </div>
            ),
          },
          {
            field: "orderId",
            headerName: "Actions",
            renderCell: (params) => (
              <Box>
                <IconButton
                  onClick={() => {
                    deleteOrder(params.value);
                  }}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>

                <IconButton onClick={() => getOrderKey(params.value)}>
                  <LaunchIcon />
                </IconButton>
              </Box>
            ),
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick

        // loading={rows.length === 0}
      />
    </Box>
  );
}
