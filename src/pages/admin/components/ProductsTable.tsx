// import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchedProduct } from "../../../types/types";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import { ref as databaseRef, remove } from "firebase/database";
// import { db } from "../../../firebase";

// const deleteProduct = () => {
//   const dbRef = databaseRef(db, "products/");

//   remove(dbRef)
//     .then(() => {
//       console.log("Data deleted successfully");
//     })
//     .catch((error) => {
//       console.error("Error deleting data:", error);
//     });
// };

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "title",
    flex: 1,
  },
  {
    field: "description",
    headerName: "description",
    flex: 2,
  },
  {
    field: "category",
    headerName: "category",
    flex: 1,
  },
  {
    field: "imageURL",
    headerName: "Image",
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
    field: "pieces",
    headerName: "pieces",
    flex: 1,
  },
  {
    field: "price",
    headerName: "price (DHS)",
    flex: 1,
  },
  {
    field: "", // Replace with the actual field name for the ID
    headerName: "Action",
    renderCell: () => (
      <IconButton>
        <DeleteIcon sx={{ color: "red" }} />
      </IconButton>
    ),
  },
];

export default function ProductsTable({ rows }: { rows: fetchedProduct[] }) {
  return (
    <Box sx={{ height: 400, width: "97%", mx: 3, mt: 5 }}>
      <Typography sx={{ color: "#000", fontSize: 18, mb: 3 }}>
        Products
      </Typography>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.id}
        columns={columns}
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
      />
    </Box>
  );
}
