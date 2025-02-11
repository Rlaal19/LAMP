import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; 

function Show() {
    const [users, setUsers] = useState([]); // เก็บข้อมูลที่ดึงมาจาก Backend
    const navigate = useNavigate();

    // ดึงข้อมูลจาก Backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/humans");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // ฟังก์ชันลบข้อมูล
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`/api/humans/${id}`);
                setUsers(users.filter((user) => user.id !== id)); 
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div>
            <div className="grid grid-cols-3 mt-8 ml-10 mr-10 py-4 bg-slate-400 opacity-80 rounded-md">
                <label className="ml-3 mr-2 font-medium">Name</label>
                <label className="mr-2 font-medium">Surname</label>
                <label className="mr-2 font-medium">Actions</label>
            </div>
            {users.map((user) => (
                <div key={user.id} className="grid grid-cols-3 ml-12 mr-12 py-2">
                    <div className="ml-2 mt-2">{user.F_name}</div>
                    <div className="mt-2">{user.L_name}</div>
                    <div>
                        <Link className="text-error" to={`/edit/${user.id}`}>
                            <button className="mr-6 btn btn-warning">
                                Edit <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        </Link>
                        <button
                            className="btn btn-warning"
                            onClick={() => handleDelete(user.id)}
                        >
                            Delete <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Show;
