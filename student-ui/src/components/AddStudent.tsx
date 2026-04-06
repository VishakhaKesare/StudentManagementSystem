
import { useDispatch } from "react-redux";
import { addStudent, fetchStudents } from "../features/student/studentSlice";
import { useState } from "react";

const AddStudent = () => {
  const dispatch = useDispatch<any>();

  const [data, setData] = useState({
    name: "",
    email: "",
    age: 0,
    course: ""
  });

  const submit = async () => {
    await dispatch(addStudent(data));
    dispatch(fetchStudents());
  };

  return (
    <div>
      <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})}/>
      <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})}/>
      <input placeholder="Age" onChange={e => setData({...data, age: +e.target.value})}/>
      <input placeholder="Course" onChange={e => setData({...data, course: e.target.value})}/>
      <button onClick={submit}>Add</button>
    </div>
  );
};

export default AddStudent;