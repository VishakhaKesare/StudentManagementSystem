import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchStudents = createAsyncThunk("student/getAll", async () => {
  const res = await API.get("/student");
  return res.data;
});

export const addStudent = createAsyncThunk("student/add", async (data: any) => {
  await API.post("/student", data);
});


export const updateStudent = createAsyncThunk(
  "student/update",
  async ({ id, data }: { id: number; data: any }) => {
    await API.put(`/student/${id}`, data);
  }
);

export const deleteStudent = createAsyncThunk(
  "student/delete",
  async (id: number) => {
    await API.delete(`/student/${id}`);
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: { list: [] as any[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default studentSlice.reducer;