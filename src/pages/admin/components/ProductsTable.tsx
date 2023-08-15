// import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchedProduct } from "../../../types/types";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ref as databaseRef, onValue, remove } from "firebase/database";
import { auth, db } from "../../../firebase";
import toast from "react-hot-toast";

const deleteProduct = async (productId: string) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated.");
    return;
  }

  const itemsRef = databaseRef(db, "products/" + user.uid);

  // Get the data matching the query
  onValue(itemsRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      if (childData.id === productId) {
        const itemKey = childSnapshot.key;
        if (!itemKey) {
          console.error("Item key not found.");
          return;
        }
        const itemRef = databaseRef(db, "products/" + user.uid + "/" + itemKey);

        remove(itemRef)
          .then(() => {
            toast.success("Product deleted successfully");
            // You can use toast or other notification mechanisms here
          })
          .catch((err) => {
            console.error("Error deleting product:", err);
            // Handle error and show an appropriate message to the user
          });
      }
    });
  });
};

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
    field: "id",
    headerName: "Action",
    renderCell: (params) => (
      <IconButton onClick={() => deleteProduct(params.value)}>
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
        loading={rows.length === 0}
      />
    </Box>
  );
}
