/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ref as databaseRef, off, onValue } from "firebase/database";
import { db } from "../../firebase";
import { ordersType } from "../../types/types";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [keys, setKeys] = useState<string[]>([]);

  // const deleteOrder = async (orderID: string) => {
  //   const dataRefToDelete = databaseRef(db, "purchase/");

  //   remove(dataRefToDelete)
  //     .then(() => {
  //       console.log("Data deleted successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting data:", error);
  //     });
  // };

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

      setKeys(Object.keys(data));
      setRows(filteredData);
    });

    return () => {
      off(dbRef);
    };
  }, [rows]);

  return (
    <Box sx={{ height: 400, width: "97%", mx: 3, mt: 5 }}>
      <Typography sx={{ color: "#000", fontSize: 18, mb: 3 }}>
        Orders
      </Typography>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.orderId}
        columns={[
          ...columns,
          {
            field: "orderId",
            headerName: "Delete Order",
            renderCell: () => (
              <IconButton
                onClick={() => {
                  keys.map((key) => {
                    console.log(key);
                  });
                }}
              >
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
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
